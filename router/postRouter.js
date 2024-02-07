const postRouter = require("express")
const verifyToken =  require("../middleware/verifyToken")
const { createPost, getAllPost, getOnePost, updatePost, deletePost, likesDislikes } = require("../controller/postController")


const router = postRouter.Router()

router.route("/create-post").post(verifyToken,createPost)
router.route("/get-all-post").get(getAllPost)
router.route("/get-one-post/:postId").get(getOnePost)
router.route("/update-post/:id").put(verifyToken,updatePost)
router.route("/delete-post/:id").delete(verifyToken,deletePost)
router.route("/likes-dislikes/:id").put(verifyToken,likesDislikes)

module.exports = router