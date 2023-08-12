import mongoose from "mongoose"
import dealsCategorySchema from "./schema.mjs"

const dealsCategory = mongoose.model('dealsCategory', dealsCategorySchema)

export default dealsCategory