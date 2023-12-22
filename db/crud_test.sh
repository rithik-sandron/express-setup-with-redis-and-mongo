#! /bin/zsh

uri=localhost:3000
post_url=p
DATA='{
  "title": "Markdown is good",
  "content": "No bytes, no problem. Just insert a document, in MongoDB"
}'

# POST
echo "POST"
post_res=$(curl -X POST -H "Content-Type: application/json" $uri/$post_url -d $DATA) 

# extracting slug from post response
isDone=$(echo $post_res | \
    python3 -c "import sys, json; print(json.load(sys.stdin)['isDone'])")
slug=$(echo $post_res | \
    python3 -c "import sys, json; print(json.load(sys.stdin)['slug'])")
echo $isDone
echo "\n"

#GET
echo "GET"
curl -X GET $uri/$slug
echo "\n"

UPDATED_DATA='{
  "title": "Markdown is good",
  "content": "No bytes, no problem. Just insert a document, in MongoDB updated"
}'

#PUT
put_res=$(curl -X PUT -H "Content-Type: application/json" $uri/$slug -d $UPDATED_DATA)
echo $put_res
echo "\n"

#GET
echo "GET"
curl -X GET $uri/$slug
echo "\n"

#DELETE
echo "DELETE"
del_res=$(curl -X DELETE $uri/$slug)
echo $del_res
echo "\n"

