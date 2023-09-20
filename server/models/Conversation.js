import mongoose from "mongoose";

const schema = mongoose.Schema;

const conversationSchema = new schema({
    members: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return this.members.includes(value)
            },
            message: "Invalid message"
        }
    }
},
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

