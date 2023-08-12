import { Schema } from "mongoose"

const userSchema = new Schema({
    name:{type:String,required:[true,'Nama wajib diisi']},
    username: { type: String, required: true,unique:[true,'Username wajib diisi'] },
    password:{type:String,required:[true,'Password wajib diisi']},
    isOfficialStore:{type:Boolean,required:false,default:false}
},{timestamps: true})

export default userSchema
