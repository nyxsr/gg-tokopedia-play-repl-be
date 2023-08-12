import { Schema } from "mongoose"

const commentSchema = new Schema({
    username:{type: String,required: [true,'Username wajib diisi']},
    comment: { type: String, required: [true,'Komentar wajib diisi'] },
},{timestamps: true})

export default commentSchema
