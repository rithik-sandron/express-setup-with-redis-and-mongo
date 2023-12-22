var express = require('express');
const { run } = require('../db/mongo');
var router = express.Router();

// var { qHashAll } = require('../db/redis')

// static image file
// http://localhost:3000/images/i.jpg

// router.get('/:id', async function (req, res) {
//   const article = await qHashAll('article:' + req.params.id);
//   res.render('article', { title: article.title, content: article.content });
// });

router.get('/', async function (req, res) {
  res.send('zro');
});

router.post('/p', async function (req, res) {
  const body = req.body;
  const callback = async function (db) {
    const articles = db.collection("articles");
    const title = body.title;
    const article = {
      slug: title.toLowerCase().split(" ").join("-"),
      title: title,
      content: body.content,
    }

    const result = await articles.insertOne(article);
    if (result.insertedId)
      return { isDone: true, slug: article.slug };
    else {
      return { isDone: false, slug: '/' }
    }
  }

  const data = await run(callback);
  res.send(data);
});

router.get('/:slug', async function (req, res) {
  const slug = req.params.slug;
  const callback = async function (db) {
    return await db.collection("articles").findOne({ slug: slug });
  }
  const data = await run(callback);
  res.send(data);
});

router.delete('/:slug', async function (req, res) {
  const slug = req.params.slug;
  const callback = async function (db) {
    const result = await db.collection("articles").deleteOne({ slug: slug });
    if (result.deletedCouunt === 1)
      return true;
    else false;
  }
  const data = await run(callback);
  res.send(data);
});

router.put('/:slug', async function (req, res) {
  const slug = req.params.slug;
  const body = req.body;
  const article = {
    $set: {
      slug: body.title.toLowerCase().split(" ").join("-"),
      title: body.title,
      content: body.content,
    },
  }
  const callback = async function (db) {
    const result = await db.collection("articles").updateOne({ slug: slug }, article);
    if (result.matchedCount === 1)
      return true;
    else false;
  }
  const data = await run(callback);
  res.send(data);
});

module.exports = router;