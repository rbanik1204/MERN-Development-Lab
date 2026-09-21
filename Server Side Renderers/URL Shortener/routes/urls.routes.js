import express from 'express'
import { handleViewShortId, handleRedirectUrl, handleVisitCount } from '../controllers/urls.controllers.js'
const router = express.Router()

router
    .route("/:id")
    .get(handleVisitCount)
router
    .route("/url/:id")
    .get(handleRedirectUrl)
router
    .route("/")
    .post(handleViewShortId)

export default router