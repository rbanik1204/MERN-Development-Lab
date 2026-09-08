const app = require("./app")
//Server Listener 
const PORT = process.env.PORT || 3000;
app.listen(PORT, "localhost", () => {
    console.log("server running on ", PORT)
})
