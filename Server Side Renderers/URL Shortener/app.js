import express from 'express' //ESM module
const app = express()
import path from 'path'
import { fileURLToPath } from 'url' //  Import this built-in utility

import urlRouter from './routes/urls.routes.js'
import { staticRouter} from './routes/staticUrls.routes.js'
//External Middlewares
import { logger } from './middlewares/logger.js'
//Mongod connection
import connectMongoDB from './connection.js'
import { globalError } from './middlewares/globalError.js'
connectMongoDB("mongodb://127.0.0.1:27017/url")
//ESM work around __dirname doesnt exist
const __filename = fileURLToPath(import.meta.url) //path of the current file that along with app.js
const __dirname = path.dirname(__filename) //gives the exact path by stripping file name


//Built-in middlewares for request body parsing
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(logger)
//serve the public directory
app.use(express.static(path.join(__dirname,'public')))//theres no prefix to strip 
app.set("views",path.join(__dirname,'./views'))//or use .resolve(__dirname,'views')
//Set template engine (.ejs,.pug,.jade)
app.set('view engine','ejs')

//Routes

app.use('/',staticRouter)
app.use('/api',urlRouter)

app.use('/analytics',urlRouter)

app.use(globalError)
//export to server.js
export default app