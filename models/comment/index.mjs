import mongoose from "mongoose"
import commentSchema from "./schema.mjs"

const commentModel = mongoose.model('comment', commentSchema)

export default commentModel