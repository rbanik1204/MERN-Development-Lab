import { createRazorpayInstance } from '../configs/razorpay.config.js'
import Product from '../models/product.model.js'
import { rupeesTopaisa } from '../utils/currency.js';
import Order from '../models/order.model.js';
import { createHmac, timingSafeEqual } from 'crypto';
export const createOrder = async (req, res) => {
    try {
        const razorpay = createRazorpayInstance();
        const { productId } = req.body
        // console.log(typeof productId)
        if (!productId) {
            return res.status(400).json({
                message: "product id is required",
                success: false
            });
        }
        //Get Product from MongoDB use findOne or findById
        const product = await Product.findOne({
            _id: productId
        });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" })
        //Conversion to paisa - Server determines the amount
        const productPaise = rupeesTopaisa(product.amount);
        const options = {
            amount: productPaise,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }
        //Create a transaction intent immutable order Object
        const razorpayOrder = await razorpay.orders.create(options);//trigger api action
        const order = { //plain order Object
            product: product._id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            razorpayOrderId: razorpayOrder.id,
            razorpayReceipt: razorpayOrder.receipt,
            status: razorpayOrder.status.toUpperCase()
        }
        const mongooseOrder = await Order.insertOne(order)
        return res.status(201).render("checkout",
            {
                success: true,
                key_id: process.env.RAZORPAY_KEY_ID,  // Public Test Key ID
                order_id: razorpayOrder.id,           // The order ID created by Razorpay
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency
            }
        );
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "unable to create razorpay order",
            success: false
        })
    }
}
//current system doesn't yet prevent the creation of another payment attempt/order for an already-paid purchase
export const verifyPaymentSignature = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
        // Basic validation
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification data is incomplete"
            });
        }
        //verify razorpay signature using HMAC-SHA256
        const dataString = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(dataString)
            .digest("hex")
        if(expectedSignature.length !== 64 || razorpay_signature.length !== 64 || typeof razorpay_signature !== "string"){
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            }); 
        }
        const isValid = timingSafeEqual(
            Buffer.from(expectedSignature, "hex"),//hex string -> raw Binary Buffer Object
            Buffer.from(razorpay_signature, "hex")
        )
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }
        //Find Order by its id
        const order = await Order.findOne({
            razorpayOrderId:razorpay_order_id
        })
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Invalid Order Id"
            })
        }
        order.razorpayOrderId = razorpay_order_id;
        order.status = "PAID";
        await order.save()
        return res.status(200).json({
            success:true,
            message:"Payment verified successfully"
        })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Payment verification failed"
        })
    }
} 
export const handlerSuccessfulPayment = (req,res)=>{
    return res.render('success')
}
export const handlerFailedPayment = (req,res)=>{
    return res.render('failure')
}