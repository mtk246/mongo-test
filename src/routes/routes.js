/** Define All Routes In This File */

const helloHandler = require("../controllers/hello_controller");
const { IsAdmin } = require("../middlewares/jwt_middleware");
const router = require("express").Router();

router.get("/", IsAdmin ,helloHandler.hello); // Hello Route
router.get("/gen",helloHandler.gen); 



exports.api_router = router;
