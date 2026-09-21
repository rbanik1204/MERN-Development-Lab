const logger = (req,res,next)=>{
    if(req.path !== "/favicon.ico")
        console.log(`${req.method} ${req.path}`)

    next();
}

module.exports = logger