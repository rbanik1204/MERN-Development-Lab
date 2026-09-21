import mongoose from 'mongoose'

async function connectMongoDB(uri){
    const tempVar = await mongoose.connect(uri)
    console.log('Mongo Daemon connected Successfully');
    return tempVar
}
//export to app.js
export default connectMongoDB