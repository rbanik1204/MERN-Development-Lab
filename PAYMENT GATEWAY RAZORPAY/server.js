import {app} from './app.js'
import connectMongoDB from './configs/mongoose.connect.js'
connectMongoDB(process.env.MONGO_URI)
const PORT = process.env.PORT || 4000
app.listen(PORT,"localhost",()=>{
    console.log(`server listening at ${PORT}`)
})