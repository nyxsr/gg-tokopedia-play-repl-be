import mongoose, { Schema } from "mongoose"

const videoSchema = new Schema({
    title: { type: String, required: true },
    urlThumbnail:{type:String,required:true},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'user',required:true}
},{timestamps: true})

export default videoSchema
