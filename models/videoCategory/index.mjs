import mongoose from "mongoose"
import videoCategorySchema from "./schema.mjs"

const videoCategory = mongoose.model('videoCategory', videoCategorySchema)

export default videoCategory