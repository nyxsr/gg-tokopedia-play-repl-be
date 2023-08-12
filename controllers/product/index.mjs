import productModel from "../../models/product/index.mjs"
import withError from "../../utils/response/withError.mjs"
import withSuccess from "../../utils/response/withSuccess.mjs"

export default class ProductController {
    async get(req,res){
        try {
            const getdata = await productModel.find()
            withSuccess(res,200,'Data Product ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async getOne(req,res){
        const {id} = req.params
        try {
            const getdata = await productModel.findOne({_id:id})
            withSuccess(res,200,'Data Product ditemukan',getdata ?? [])
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async create(req,res){
        const {title,url,price,createdBy,urlThumbnail} = req.body

        try {

            const product = new productModel({
                title,
                url,
                price,
                createdBy,
                urlThumbnail
            })

            const save = await product.save()

            withSuccess(res,201,'Data berhasil dibuat',save)
        } catch (error) {
            withError(res,500,error.message)
        }
    }

    async update(req,res){
        const {id} = req.params
        try {
            const doUpdate = await productModel.updateOne({_id:id},{...req.body},{new:true})
            withSuccess(res,201,'Data berhasil dirubah',doUpdate)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
    
    async delete(req,res){
        const {id} = req.params

        try {
            const doDelete = await productModel.deleteOne({_id:id})
            withSuccess(res,200,'Berhasil menghapus data',doDelete)
        } catch (error) {
            withError(res,500,error.message)
        }
    }
}