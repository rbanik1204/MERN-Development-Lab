import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR",
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },
    razorpayReceipt: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["CREATED", "PAID", "FAILED"],
        default: "CREATED"
    }
}, { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema)
export default Order