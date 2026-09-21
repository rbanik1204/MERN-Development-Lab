import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url' //  Import this built-in utility
import dotenv from 'dotenv'
import {logger} from './middlewares/logger.js'
import {router as homeRouter} from './routes/home.routes.js'
import {router as createOrderRouter} from './routes/payments.routes.js'
import { globalError } from './middlewares/globalError.js'
dotenv.config({
    override: true,
    silent: true,
    quiet:true
});
const app = express()
//Custom middleware for HTTP method,route logging
app.use(logger)
//ESM work around __dirname doesnt exist
const __filename = fileURLToPath(import.meta.url) //path of the current file that along with app.js
const __dirname = path.dirname(__filename) //gives the exact path by stripping file name

//Built-in middlewares for request body parsing
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//static files serving
app.use(express.static(path.join(__dirname,"public")))
app.set("views",path.join(__dirname,"views"))
//Set template engine (.ejs,.pug,.jade)
app.set('view engine','ejs')
//Routes
app.use("/api/payments",createOrderRouter)
app.use('/',homeRouter)

app.use(globalError)
export { app }