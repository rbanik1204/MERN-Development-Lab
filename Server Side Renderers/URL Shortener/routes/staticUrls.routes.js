import express from 'express'
import { handleViewShortId } from '../controllers/urls.controllers.js';
const staticRouter = express.Router();
staticRouter.get('/test',(req,res,next)=>{
    res.render('index')
})
staticRouter.post('/url',handleViewShortId)

export { staticRouter }