const notfound = (req, res, next) => {
    const error = new Error("Resource not found");
    error.code = 404;
    return next(error);
};
module.exports = notfound