import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    title:{type:String,required:true},
    url: { type: String, required: true },
    price:{type:Number,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
},{timestamps: true})

export default productSchema
