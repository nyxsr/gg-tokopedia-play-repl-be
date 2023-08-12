import videoCategoryModel from "../../models/videoCategory/index.mjs"
import withError from "../../utils/response/withError.mjs"
import withSuccess from "../../utils/response/withSuccess.mjs"

export default class VideoCategoryController {
    async get(req,res){
        try {
            const getdata = await videoCategoryModel.find()
            withSuccess(res,200,'Data Video Kategori ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getOne(req,res){
        const {id} = req.params
        try {
            const getdata = await videoCategoryModel.findOne({_id:id})
            withSuccess(res,200,'Data Video Kategori ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async create(req,res){
        const {name} = req.body

        try {

            const video = new videoCategoryModel({
                name
            })

            const save = await video.save()

            withSuccess(res,201,'Data berhasil dibuat',save)
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async update(req,res){
        const {id} = req.params
        try {
            const doUpdate = await videoCategoryModel.updateOne({_id:id},{...req.body},{new:true})
            withSuccess(res,201,'Data berhasil dirubah',doUpdate)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
    
    async delete(req,res){
        const {id} = req.params

        try {
            const doDelete = await videoCategoryModel.deleteOne({_id:id})
            withSuccess(res,200,'Berhasil menghapus data',doDelete)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}