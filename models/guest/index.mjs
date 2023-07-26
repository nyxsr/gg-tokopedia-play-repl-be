import mongoose from "mongoose"
import guestSchema from "./schema.mjs"

const guestModel = mongoose.model('guest', guestSchema)

export default guestModel