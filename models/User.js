const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "username is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			unique: true,
			validate: {
				validator: function (v) {
					//email@yahoo.com
					return /\{string}\@{string}\.{string}/.test(v);
				},
				message: (props) => `${props.value} is not a valid email`,
			},
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);
// get total count of friends and replies on retrieval
UserSchema.virtual("friendCount").get(function () {
	return this.friends.reduce(
		(total, friend) => total + friend.replies.length + 1,
		0
	);
});
// create the User model using UserSchema
const User = model("User", UserSchema);

// expoert the user model
model.exports = User;
