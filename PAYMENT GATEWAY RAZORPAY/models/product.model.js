import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        description:{
            type:String
        }
    },{
        timestamps:true
    }
);

const Product = mongoose.model("Product",productSchema)

export default Product