import userModel from "../../models/user/index.mjs";
import withError from "../../utils/response/withError.mjs";
import withSuccess from "../../utils/response/withSuccess.mjs";
import bcrypt from 'bcrypt'

export default class UserController {
    async get(req,res){
        try {
            const getdata = await userModel.find()
            withSuccess(res,200,'Data User ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getOne(req,res){
        const {id} = req.params
        try {
            const getdata = await userModel.findOne({_id:id})
            withSuccess(res,200,'Data User ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async create(req,res){
        const {name,username,password} = req.body

        try {
            const encrypted = await bcrypt.hash(password,10)

            const user = new userModel({
                name:name,
                username:username,
                password:encrypted
            })

            const save = await user.save()

            withSuccess(res,201,'Data berhasil dibuat',save)
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async update(req,res){
        const {id} = req.params
        try {
            const doUpdate = await userModel.updateOne({_id:id},{...req.body},{new:true})
            withSuccess(res,201,'Data berhasil dirubah',doUpdate)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
    
    async delete(req,res){
        const {id} = req.params

        try {
            const doDelete = await userModel.deleteOne({_id:id})
            withSuccess(res,200,'Berhasil menghapus data',doDelete)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}