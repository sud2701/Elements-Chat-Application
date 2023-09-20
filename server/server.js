import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import grid from 'gridfs-stream';
import bodyParser from 'body-parser';
const app = express();
const uri = process.env.URI;
const PORT = process.env.PORT || 4000;
import upload from "./utils/upload.js";
import User from "./models/User.js";
import cors from 'cors';
import Conversation from './models/Conversation.js';
let gfs, gridFsBucket;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log('Connected to the database');

    gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'fs'
    });
    gfs = grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('fs');
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

app.post("/new-user", async (req, res) => {
    const account = req.body;
    const user = { name: account.name, given_name: account.given_name, family_name: account.family_name, profile_image: account.picture, email_verified: account.email_verified, sub: account.sub, email: account.email };
    try {
        let user_exists = await User.findOne({ sub: account.sub });
        if (user_exists) {
            res.status(200).json({ msg: "User already exists" });
        }
        else {
            const new_user = new User(user);
            await new_user.save();
            res.status(200).json(new_user);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/users", async (req, res) => {

    try {
        const data = await User.find({ email_verified: true });
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ error: "Internal server error" }); // Send an error response to the client
    }


});

app.post("/conversation/create", async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const message_exists = await Conversation.findOne({ members: { $all: [receiverId, senderId] } })
        if (message_exists) {
            return res.status(200).json("Conversation already exists");
        }
        const new_conversation = new Conversation({
            members: [senderId, receiverId]
        })
        await new_conversation.save();
        return res.status(201).json("New Conversation created");
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/conversation", async (req, res) => {
    const senderId = req.query.senderId;
    const receiverId = req.query.receiverId;
    try {
        const conversations = await Conversation.find({ members: { $all: [senderId, receiverId] } }).sort({ createdAt: 'asc' });
        if (conversations.length > 0) {
            res.status(200).json(conversations);
        } else {
            res.status(202).json("No messages to show");
        }
    } catch (err) {
        res.status(400).json("Unable to fetch any messages from this conversation");
    }
});

app.get("/conversations", async (req, res) => {
    try {
        const all = await Conversation.find({});
        res.status(200).json(all);
    }
    catch (err) {
        res.status(400).json("Unable to fetch conversations");
    }
})



app.post("/conversation/add", async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    try {
        const new_conv = new Conversation({ members: [senderId, receiverId], message: message, sender: senderId });
        await new_conv.save();
        return res.status(200).json("Message sent");
    } catch (err) {
        return res.status(400).json("Unable to send message");
    }
})


app.post("/upload/file", upload.single("file"), async (req, res) => {
    try {

        const url = "http://localhost:4000"
        if (!req.file) {
            return res.status(404).json("File not found");
        }
        const imageUrl = `${url}/file/${req.file.filename}`;

        return res.status(200).json(imageUrl);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }

});

app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridFsBucket.openDownloadStreamByName(req.params.filename);
        readStream.pipe(res);
    } catch (err) {
        return res.status(500).json(err.message);
    }
})