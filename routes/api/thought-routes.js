const router = require("express").Router();

const {
	createThought,
	getAllThought,
	getThoughtById,
	thoughtUpdate,
	deleteThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought).post(createThought);

router.route("/:id").get(getThoughtById);

router.route("/:userId/:thoughtId").put(thoughtUpdate).delete(deleteThought);

router.route("/reaction/:userId/:thoughtId").post(addReaction);

router.route("/:userId/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
