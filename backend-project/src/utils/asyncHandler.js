const asyncHandler = (requestHandler) => (
   (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))}
    )


export {asyncHandler}



// this file is for handling funciton and execute them 

// const asyncHandler  =(fn) =>async (req , res ,next)=>{
// try{
// await fn(req, res, next)
// }catch(err){
//     res.status(err.code || 500).json({
//         success: false,
//         message:err.message
//     })
// }
// }
