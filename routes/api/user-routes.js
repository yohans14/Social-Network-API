const router = require("express").Router();

const {
	getAllUser,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addFriends,
	removeFriend,
} = require("../../controllers/user-controller");

router.route("/").post(createUser).get(getAllUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router
	.route("/:userId/friends/:friendId")
	.post(addFriends)
	.delete(removeFriend);

module.exports = router;
