import mongoose, { Schema } from "mongoose"

const videoCategorySchema = new Schema({
    name: { type: String, required: [true,'Nama Video Kategori wajib diisi!'] },
},{timestamps: true})

export default videoCategorySchema
