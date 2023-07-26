import mongoose from "mongoose"
import commentModel from "../../models/comment/index.mjs"
import userModel from "../../models/user/index.mjs"
import guestModel from "../../models/guest/index.mjs"
import withError from "../../utils/response/withError.mjs"
import withSuccess from "../../utils/response/withSuccess.mjs"

export default class CommentController {
    async get(req,res){
        try {
            const getdata = await commentModel.find()
            withSuccess(res,200,'Data Comment ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getOne(req,res){
        const {id} = req.params
        try {
            const getdata = await commentModel.findOne({_id:id})
            withSuccess(res,200,'Data Comment ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async create(req,res){
        const {username,comment} = req.body

        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            let selectedUser;
            const checkUser = await userModel.findOne({username}).select('_id username')

            if (!checkUser) {
                const createNewGuest = await guestModel.create({username},{session})
                selectedUser = createNewGuest.username
            }

            selectedUser = checkUser.username

            const newcomment = new commentModel({
                username:selectedUser,
                comment:comment,
            })

            const save = await newcomment.save()

            await session.commitTransaction()
            withSuccess(res,201,'Data berhasil dibuat',save)
        } catch (error) {
            withError(res,500,error.message)
            await session.abortTransaction()
        } finally{
            session.endSession()
        }
    }

    async update(req,res){
        const {id} = req.params
        try {
            const doUpdate = await commentModel.updateOne({_id:id},{...req.body},{new:true})
            withSuccess(res,201,'Data berhasil dirubah',doUpdate)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
    
    async delete(req,res){
        const {id} = req.params

        try {
            const doDelete = await commentModel.deleteOne({_id:id})
            withSuccess(res,200,'Berhasil menghapus data',doDelete)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}