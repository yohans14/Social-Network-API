const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: [true, "please inclued your reaction text!"],
			trim: true,
		},
		reactionBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: [true, "Please tell us what you want to share!"],
			trim: true,
			minlength:1,
			maxlength:280
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);
//reactions count for each thoughts
ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

model.exports = Thought;
