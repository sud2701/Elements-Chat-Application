import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bodyParser from 'body-parser';
const app = express();
const uri = process.env.URI;
const PORT = process.env.PORT || 4000;
import http from 'http';
import User from "./models/User.js";
import cors from 'cors';
import Conversation from './models/Conversation.js';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server);

const customIdToSocketMap = new Map();
io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log("Connected to the client");



    socket.on('send-message', (message, receiverId) => {

        const object = { members: [id, receiverId], message: { message }, sender: id };

        socket.broadcast.to(receiverId).emit("receive-message", object);
        socket.emit("receive-message", object);
    });

    socket.on('send-reply', (message, reply_to, receiverId) => {
        const object = { members: [id, receiverId], message: { message, reply_to: reply_to }, sender: id };
        socket.broadcast.to(receiverId).emit("receive-message", object);
        socket.emit("receive-message", object);
    })


})
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Connected to the database');
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

}).catch((err) => {
    console.log("Unable to connect to the database");
})

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

app.post("/new-user", async (req, res) => {
    const account = req.body;
    const user = { name: account.name, given_name: account.given_name, family_name: account.family_name, profile_image: account.picture, email_verified: account.email_verified, sub: account.sub, email: account.email, socketID: account.socketID };
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
        return res.status(200).json(data);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ error: "Internal server error" }); // Send an error response to the client
    }


});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ sub: id });
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(500).json("User doesn't exist");
        }
    } catch (err) {
        return res.status(500).json("Unable to fetch error");
    }
})

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
        // Find conversations between sender and receiver
        let conversations = await Conversation.find({
            members: { $all: [senderId, receiverId] }
        }).sort({ createdAt: 'asc' });

        // Use Promise.all to fetch reply messages
        for (let conv of conversations) {
            if (conv.message.reply_to) {
                let reply_msg = await Conversation.findById(conv.message.reply_to);
                conv.message.reply_to = reply_msg;
            }
        }

        conversations = await Promise.all(conversations);
        console.log(conversations);
        if (conversations.length > 0) {
            res.status(200).json(conversations);
        } else {
            res.status(202).json("No messages to show");
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json("Internal server error");
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




