async function handleViewHome(req,res,next){
    try{
        console.log("From home controller")
        return res.render("index",{
            message:"Welcome to Payment Gateway",
            status:true
        })
    }catch(error){
        error.code = 404,
        error.message= "No content Found"
        next(error) 
    }
}
export { handleViewHome }