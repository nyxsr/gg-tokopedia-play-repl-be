import mongoose from "mongoose"
import videoSchema from "./schema.mjs"

const videoModel = mongoose.model('video', videoSchema)

export default videoModel