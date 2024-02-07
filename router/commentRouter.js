const commentRouter = require("express")
const verifyToken = require("../middleware/verifyToken")
const { allComments, oneComment, postComment, updateComment, deleteComment, likeToggle } = require("../controller/commentController")
const { verify } = require("jsonwebtoken")

const router = commentRouter.Router()

router.route("/get-all-comments/:postId").get(allComments)
router.route("/get-one-comment/:commentId").get(oneComment)
router.route("/create-comment").post(verifyToken,postComment)
router.route("/update-comment/:commentId").put(verifyToken,updateComment)
router.route("/delete-comment/:commentId").delete(verifyToken,deleteComment)
router.route("/like-dislike/:commentId").put(verifyToken,likeToggle)



module.exports = router