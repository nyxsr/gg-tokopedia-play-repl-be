import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    title:{type:String,required:[true,'Nama Produk wajib diisi']},
    url: { type: String, required: [true,'URL Produk wajib diisi'] },
    urlThumbnail: { type: String, required: [true,'URL Thumbnail wajib diisi'] },
    price:{type:Number,required:[true,'Harga wajib diisi']},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:[true,'Pembuat wajib diisi']}
},{timestamps: true})

export default productSchema
