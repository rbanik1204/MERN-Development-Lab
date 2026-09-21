const fs = require("fs")
const path = require("path")
const users = require("../data/MOCK_DATA.json");

const getUsers = (req, res) => {
    // console.log(req.body)
    const html = `
    <ul style="list-style-type: none;">
    ${users.map((user) => {
        return `<li>${user.first_name}&nbsp;${user.last_name}&nbsp;${user.email}</li>`
    }).join("")}
    </ul>`
    res.send(html)
};
const getUser = (req,res,next)=>{
    const userID = Number(req.params.id);
    const userIndex = users.findIndex(usr=>usr.id === userID)
    if (userIndex === -1) {
        const error = new Error("Resource not found")
        error.code = 404
        return next(error)
    }
    return res.status(200).send(users[userIndex]);  
}
const createUser = (req, res, next) => {
    const user = { ...req.body, id: users.length + 1 }
    console.log("BODY: ",req.body)
    if (!user.first_name || !user.last_name || !user.email || !user.id || !user.gender || !user.ip_address) {
        const error = new Error("Unprocessable Entity")
        error.code = 422
        return next(error)
    }
    users.push(user)
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            err.message = "Internal Server Error"
            err.code = 500
            return next(err)
        }
        return res.status(201).json({ status: "success" })
    })
};
const deleteUser = (req, res, next) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(usr => usr.id === id);
    if (userIndex === -1) {
        const error = new Error("Resource not found")
        error.code = 404
        return next(error)
    }
    users.splice(userIndex, 1);
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            err.message = "Internal Server Error"
            err.code = 500
            return next(err)
        }
        return res.sendStatus(204);
    })

};
const updateUser = (req, res, next) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(usr => usr.id === id);
    console.log("BODY:", req.body);
    console.log("UPDATED USER:", users[userIndex]);
    if (userIndex === -1) {
        const error = new Error("Resource not found")
        error.code = 404
        return next(error)
    }
    Object.assign(users[userIndex], req.body)
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            err.message = "Internal Server Error"
            err.code = 500
            return next(err);
        }
        return res.status(200).json("Successful patching");
    })
};
module.exports = {
    getUsers, getUser, createUser, updateUser, deleteUser
};