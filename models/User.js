const { Schema, model, Types } = require("mongoose");

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
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
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
		},
		id: false,
	}
);
// get total count of friends and replies on retrieval
UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

// create the User model using UserSchema
const User = model("User", UserSchema);

// expoert the user model
module.exports = User;
