import mongoose from "mongoose"
import userSchema from "./schema.mjs"

const userModel = mongoose.model('user', userSchema)

export default userModel