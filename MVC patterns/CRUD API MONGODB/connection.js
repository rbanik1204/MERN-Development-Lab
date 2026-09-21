const mongoose = require('mongoose')

async function connectMongoDB(url){
   const temporaryValue = await mongoose.connect(url) // Mongoose instance/ object
   console.log("Mongo daemon is connected!")
   return temporaryValue;
}

module.exports = {
    connectMongoDB
}

