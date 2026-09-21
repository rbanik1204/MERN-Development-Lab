const renderHome = (req, res, next) => {
    try {
        console.log("Rendering "+req.path);
        res.render("../views/index");
    }
    catch(error){
        next(error)
    }
}

module.exports = { renderHome }