import userModel from "../../models/user/index.mjs";
import withError from "../../utils/response/withError.mjs";
import withSuccess from "../../utils/response/withSuccess.mjs";
import bcrypt from 'bcryptjs'
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

            const token = jwt.sign({data:get.username},process.env.SECRET_KEY,{expiresIn:'1d'})

            const user = {
                _id:get._id,
                username:get.username,
                name:get.name,
                isOfficialStore:get.isOfficialStore
            }

            const response = {
                user:user,
                token:token
            }

            
            withSuccess(res,200,'Berhasil Login!',response)
        } catch (error) {
            withError(res,500,error.message)

        }
    }

    async register(req,res){
        const {name,username,password} = req.body

        try {
            const encrypted = await bcrypt.hash(password,10)

            const user = new userModel({
                name,
                username,
                password:encrypted,
            })

            const token = jwt.sign({data:username},process.env.SECRET_KEY,{expiresIn:'1d'})

            const save = await user.save()

            const userdata = {
                _id:save._id,
                username:save.username,
                name:save.name,
                isOfficialStore:save.isOfficialStore
            }

            const response = {
                user:userdata,
                token:token
            }

            withSuccess(res,201,'Data berhasil dibuat',response)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}