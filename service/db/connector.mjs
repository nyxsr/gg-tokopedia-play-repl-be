import mongoose from "mongoose";

export default function connector(url) {
    mongoose.connect(url).then((res)=>{
        console.log('Database terhubung!')
    }).catch((err)=>{
        console.log('Tidak terhubung dengan database!')
    })
}
