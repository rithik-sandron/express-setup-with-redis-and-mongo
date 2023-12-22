const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function mongoConnect() {
    try {
        await client.connect();
        client.db("express");
        console.log("You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

async function run(callback) {
    try {
        await client.connect();
        const db = client.db("express");
        return await callback(db);
    } finally {
        await client.close();
    }
}

module.exports = { mongoConnect, run }