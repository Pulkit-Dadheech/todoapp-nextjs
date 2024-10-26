const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{timestamps: true});

mongoose.models = {};

export const Task = new mongoose.model("Task",schema);