const express = require("express")
const app = express()
require("dotenv").configDotenv()
const userRoutes = require("./routes/user.routes");
const logger = require("./middlewares/logger");
const globalError = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
//Middlewares
app.use(logger)

//Built-in Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Routes
app.use("/users",userRoutes)


//404 not found
app.use(notFound)
//Middleware error Handler 404 Global Error Handler
app.use(globalError);


module.exports = app;