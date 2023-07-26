import mongoose from "mongoose"
import productSchema from "./schema.mjs"

const productModel = mongoose.model('product', productSchema)

export default productModel