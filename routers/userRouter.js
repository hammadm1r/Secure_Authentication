const router = require("express").Router();
const authController = require("../controller/authController");
const {jwtAuthMiddleware} = require("../middleware/jwtAuthMiddleware");
router.post("/login",authController.login);
router.post("/signup",authController.signup);
router.get("/hello",jwtAuthMiddleware,(req,res)=>{return res.status(200).json("HelloWorld")});

module.exports = router;