const userRouter = require("express")
const verifyToken = require("../middleware/verifyToken")
const { singleUser, allUsers, updateUser, deleteUser, toggleUser } = require("../controller/userController")

const router = userRouter.Router()


router.route("/single-user/:userId").get(verifyToken,singleUser)
router.route("/all-users").get(allUsers)
router.route("/update-user/:userId").put(verifyToken,updateUser)
router.route("/delete-user/:userId").delete(verifyToken,deleteUser)
router.route("/toggle-user/:otherUserId").put(verifyToken,toggleUser)



module.exports = router