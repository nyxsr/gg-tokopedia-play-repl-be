import mongoose, { Schema } from "mongoose"

const dealsCategorySchema = new Schema({
    name: { type: String, required: [true,'Nama Deals Kategori wajib diisi'] },
    kind: { type: String, enum:['promo','rilis'], required: [true,'Jenis wajib diisi (Promo atau Rilis)'] },
},{timestamps: true})

export default dealsCategorySchema
