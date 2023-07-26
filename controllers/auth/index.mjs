import userModel from "../../models/user/index.mjs";
import withError from "../../utils/response/withError.mjs";
import withSuccess from "../../utils/response/withSuccess.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthController{
    async login(req,res){
        const {username,password} = req.body
        try {
            const get = await userModel.findOne({username})
            if (!get) {
                withError(res,403,'Username atau Password yang dimasukkan salah!')
                return;
            }
            
            const checkPassword = await bcrypt.compare(password,get.password)
            if (!checkPassword) {
                withError(res,403,'Username atau Password yang dimasukkan salah!')
                return;
            }

            const token = jwt.sign({data:get.username},process.env.SECRET_KEY,{expiresIn:'1h'})

            const response = {
                user:get,
                token:token
            }

            
            withSuccess(res,200,'Berhasil Login!',response)
        } catch (error) {
            withError(res,500,error.message)

        }
    }
}