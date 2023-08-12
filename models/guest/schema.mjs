import { Schema } from "mongoose"

const guestSchema = new Schema({
    username:{type:String,required:[true,'Username wajib diisi']},
},{timestamps: true})

export default guestSchema
