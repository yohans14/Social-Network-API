const { User } = require("../models");

const userController = {
	//get all Users
	getAllUser(req, res) {
		User.find({})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => {
				// If no User is found, send 404
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => {
				console.log(dbUserData);
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
	// delete user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
	addFriends(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					return res
						.status(404)
						.json({ message: "No User found with this id!" });
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},
	// call back function to delete the friend request
	removeFriend({ params }, res) {
		User.findByIdAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},
};

module.exports = userController;
