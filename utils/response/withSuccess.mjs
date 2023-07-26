const withSuccess = (res,code,message,data,isPaginate,paginateData) =>{
    if (isPaginate) {
        res.status(code).json({
            meta:{
                code:code,
                message:message
            },
            data:data,
            limit:paginateData.limit,
            page:paginateData.page,
            totalData:paginateData.totalData
        })
        return;
    }
    res.status(code).json({
        meta:{
            code:code,
            message:message
        },
        data:data
    })
}

export default withSuccess