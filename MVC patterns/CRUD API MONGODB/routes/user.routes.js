const express = require('express')
const {getUsers, createUsers,createUser, getUser, updateUser,updateUsers,deleteUsers,deleteUser} = require("../controllers/user.controllers")
const router = express.Router();

router
    .route("/users")
    .get(getUsers)
    .post(createUsers)
    .patch(updateUsers)
    .delete(deleteUsers)
router
    .route("/user")
    .post(createUser)
router
    .route("/user/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router