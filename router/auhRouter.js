const authRouter = require("express")

const router = authRouter.Router()

const {authUser, userLogin} = require("../controller/authController")

router.route("/register").post(authUser)
router.route("/login").post(userLogin)

module.exports = router