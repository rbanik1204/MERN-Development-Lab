import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema(
    {
        shortId:{
            type:String,
            required:true,
            unique:true
        },
        redirectUrl:{
            type:String,
            required:true,
        },
        visitHistory:[{ //Stores multiple visits
            timestamp:{
                type:Number,
                default:()=>Date.now() //Automatically adds current time on push
            }
        }]
    },{timestamps: true }
)
const urlModel = mongoose.model('url',urlSchema)

export default urlModel