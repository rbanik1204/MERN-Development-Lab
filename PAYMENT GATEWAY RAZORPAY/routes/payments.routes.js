import express from 'express'
import { createOrder,verifyPaymentSignature,handlerSuccessfulPayment, handlerFailedPayment } from '../controllers/payments.controllers.js'

const router = express.Router();
router
    .post('/create-order',createOrder)
    .get('/verify-payment',verifyPaymentSignature)
    .post('/verify-payment',verifyPaymentSignature)
    .get('/success',handlerSuccessfulPayment)
    .get('/failure',handlerFailedPayment)
export {router}