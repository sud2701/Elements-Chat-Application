import mongoose from "mongoose";

const schema = mongoose.Schema;

const reactionSchema = new schema({
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    reaction: {
        type: String,
        required: true
    }
})

const messageSchema = new schema({
    message: {
        type: String,
        required: true
    },
    reply_to: {
        type: String
    },
    reactions: {
        type: [reactionSchema]
    }

})
const conversationSchema = new schema({
    members: {
        type: Array,
        required: true
    },
    message: {
        type: messageSchema,
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

