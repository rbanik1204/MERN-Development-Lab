import { handleViewHome } from '../controllers/home.controllers.js';
import express from 'express'
const router = express.Router()

router
    .get('/home',handleViewHome)

export {router};