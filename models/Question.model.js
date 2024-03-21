const { Schema, model, default: mongoose } = require("mongoose");

const questionSchema = new Schema(
{
    question: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },
    userName: {
        type: String
    }
}
)

const Question = model("Question", questionSchema)

module.exports = Question