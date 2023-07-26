
import guestModel from "../../models/guest/index.mjs";
import withError from "../../utils/response/withError.mjs";
import withSuccess from "../../utils/response/withSuccess.mjs";
import bcrypt from 'bcrypt'

export default class GuestController {
    async get(req,res){
        try {
            const getdata = await guestModel.find()
            withSuccess(res,200,'Data Guest ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getOne(req,res){
        const {id} = req.params
        try {
            const getdata = await guestModel.findOne({_id:id})
            withSuccess(res,200,'Data Guest ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async create(req,res){
        const {username} = req.body

        try {

            const guest = new guestModel({
                username:username,
            })

            const save = await guest.save()

            withSuccess(res,201,'Data berhasil dibuat',save)
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async update(req,res){
        const {id} = req.params
        try {
            const doUpdate = await guestModel.updateOne({_id:id},{...req.body},{new:true})
            withSuccess(res,201,'Data berhasil dirubah',doUpdate)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
    
    async delete(req,res){
        const {id} = req.params

        try {
            const doDelete = await guestModel.deleteOne({_id:id})
            withSuccess(res,200,'Berhasil menghapus data',doDelete)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}