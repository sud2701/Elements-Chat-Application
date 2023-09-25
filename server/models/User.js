import mongoose from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    given_name: {
        type: String,
        required: true,
    },
    family_name: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    sub: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    socketID: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

export default User;