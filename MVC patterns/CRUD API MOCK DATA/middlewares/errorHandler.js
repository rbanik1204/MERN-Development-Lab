const globalError = (err, req, res, next) => {
    res.status(err.code || 500).send(err.message || "Internal Server Error");
};

module.exports = globalError