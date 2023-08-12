import videoModel from "../../models/video/index.mjs"
import VideoKategoriModel from "../../models/videoCategory/index.mjs"
import withError from "../../utils/response/withError.mjs"
import withSuccess from "../../utils/response/withSuccess.mjs"

export default class VideoController {
    async get(req,res){
        const {videoCategory} = req.query;
        try {
            let result;
            const getdata = await videoModel.find().populate('creator dealsCategory')

            if(!videoCategory){
                withSuccess(res,200,'Data Semua Video ditemukan',getdata ?? [])
                return;
            }

            if (videoCategory === 'newest') {
                const getdata = await videoModel.find().populate('creator dealsCategory').sort({createdAt:-1})
                withSuccess(res,200,'Data Video Terbaru ditemukan',getdata ?? [])
                return;
            }

            if (videoCategory !== '' || !videoCategory) {
                const getkategori = await VideoKategoriModel.findOne({name:videoCategory})
                result = getdata.filter((v)=>v.videoCategory.toString() === getkategori._id.toString())
            }
            withSuccess(res,200,'Data Video ditemukan',result ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getOne(req,res){
        const {id} = req.params
        try {
            const getdata = await videoModel.findOne({_id:id})
            withSuccess(res,200,'Data Video ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getManyByFilter(req,res){
        try {
            const get = await videoModel.find({...req.body}).populate('creator videoCategory dealsCategory')

            withSuccess(res,200,'Data ditemukan',get)
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getVideoComments(req,res){
        const {id} = req.params
        try {
            const get = await videoModel.findOne({_id:id}).select('comments').populate('comments')
            withSuccess(res,200,'Komentar untuk video ini ditemukan',get)
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async create(req,res){
        const {title,urlThumbnail,creator,src,videoCategory,dealsCategory,isOnlyLive} = req.body

        try {

            const video = new videoModel({
                title,
                urlThumbnail,
                creator,
                src,
                videoCategory,
                dealsCategory,
                isOnlyLive
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
            const doUpdate = await videoModel.updateOne({_id:id},{...req.body},{new:true})
            withSuccess(res,201,'Data berhasil dirubah',doUpdate)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
    
    async delete(req,res){
        const {id} = req.params

        try {
            const doDelete = await videoModel.deleteOne({_id:id})
            withSuccess(res,200,'Berhasil menghapus data',doDelete)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}