import shortId from 'shortid';
import urlModel from '../models/url.model.js'
async function handleViewShortId(req, res, next) {
    const body = req.body
    let id = null;
    let redirectUrl = req.body.redirectURL
    if (!redirectUrl) return res.status(400).json({ message: "url is required!" })
    const instance = await urlModel.findOne({ redirectUrl })
    if (!instance) {
        id = shortId(8);
        var urlInstance = new urlModel({
            shortId: id,
            redirectUrl: redirectUrl,
            visitHistory: []
        })
        await urlInstance.save() //Instance method
    }
    else {
        id = instance.shortId;
        const urlDocument = await urlModel.findOneAndUpdate(
            {shortId:id},{
                $push:{
                    visitHistory:{
                        timestamp:Date.now()
                    }
                }
            }
        )
    }
    console.log(redirectUrl)
    const allUrls = await urlModel.find();
    return res.status(201).json({
        message: "successfully shortened url: " + redirectUrl,
        id, allUrls
    });//This is one way middleware ->staticRoute->controller(POST)->SSR ejs -> Client
    //side script fetch api-> Middleware -> staticRoute-> controller(POST)-> highjacking the response before SSR ejs receives
    //web fetch api grabbing the response 
    //However theres an easy way as well that is middleware-> controller of POST
}
async function handleRedirectUrl(req, res, next) {
    const sId = req.params.id //string
    console.log(sId)
    const urlInstance = await urlModel.findOneAndUpdate({ shortId: sId }
        , {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    ) //parses to Mongoose Object
    res.redirect(urlInstance.redirectUrl)
}
async function handleVisitCount(req, res, next) {
    const sId = req.params.id;
    const urlInstance = await urlModel.find({ shortId: sId }).lean()
    console.log(sId)
    if (!urlInstance) return res.status(400).json({ message: sId + " is invalid!" })
    return res.status(200).json({
        visitCount: urlInstance[0].visitHistory.length,
        analytics: urlInstance[0].visitHistory
    })
}
async function viewAllUrls(req, res, next) {
    const urls = await urlModel.find({}) //returns array of query object

}
export { handleViewShortId, handleRedirectUrl, handleVisitCount }