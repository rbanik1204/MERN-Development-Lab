const app = require("./app")
const dotenv = require('dotenv').configDotenv()
const PORT = process.env.PORT || 3000
app.listen(PORT, "localhost", () => {
    console.log("server running at http://[::1]:3000/")
})