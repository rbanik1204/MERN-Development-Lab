const expressCore = require("express"); // Load core framework for the router
const { renderHome } = require("../controllers/home.controllers"); 

const router = expressCore.Router(); 

router.route("/")
  .get(renderHome);

module.exports = router;
