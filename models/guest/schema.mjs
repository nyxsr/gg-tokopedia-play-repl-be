import { Schema } from "mongoose"

const guestSchema = new Schema({
    username:{type:String,required:true},
},{timestamps: true})

export default guestSchema
