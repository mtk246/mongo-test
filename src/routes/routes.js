/** Define All Routes In This File */

const helloHandler = require("../controllers/hello_controller");
const { authCheck } = require("../middlewares/auth_middleware");
const { tenantMiddleware } = require("../middlewares/tenant_middleware");
const router = require("express").Router();


router.use(authCheck)  // Pass through permission handler api!
router.use(tenantMiddleware)  // get knex connection for each api endpoint.


router.get("/" ,helloHandler.hello); // Hello Route
//router.get("/gen", helloHandler.gen); 


exports.api_router = router;