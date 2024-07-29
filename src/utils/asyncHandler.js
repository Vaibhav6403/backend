export const asyncHandler = (fn) => async (req,res,next) =>{
    try {
        await fn(req,res,next)
    } catch (error){
        res.status(error.code<1000 || 500).json({
            success:false,
            message:error.message
        })
    }
}