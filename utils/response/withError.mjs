const withError = (res,code,message) =>{
    res.status(code).json({
        meta:{
            code:code,
            message:message
        },
        data:[]
    })
}

export default withError