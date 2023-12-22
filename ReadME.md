## Start Express
DEBUG=express:* npm start

## Redis DB
brew install redis
redis-server

## Mongo DB
brew tap mongodb/brew
brew install mongodb-community@7.0
### start stop as services
brew services start mongodb-community@7.0
brew services stop mongodb-community@7.0
### start working
disableTelemetry()
mongosh
### commands
Mongo.md has all basic commands