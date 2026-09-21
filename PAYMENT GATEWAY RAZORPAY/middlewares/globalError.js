const globalError = (err, req, res, next) => {
    return res.json({
            success:false,
            message: err.message || "Internal Server Error",
            stack:err.stack
        })
}
export { globalError }