const createNewUser = async (data) => {
    const url = "http://localhost:4000";
    try {
        let res = await fetch(`${url}/new-user`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        res = await res.json();
        if (!res.error) {
            console.log("User added successfully")
        }
        else {
            console.log("Unable to add user");
        }
    } catch (err) {
        console.log(err);
    }
}

const getUsers = async () => {
    const uri = "http://localhost:4000/users";
    try {
        let users = await fetch(uri);
        users = await users.json();
        return users;
    } catch (err) {
        console.log(err.message);
    }

}

const getMessages = async (senderId, receiverId) => {
    const uri = "http://localhost:4000/conversation";
    try {
        const res = await fetch(`${uri}?senderId=${senderId}&receiverId=${receiverId}`);
        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
        if (res.status === 202) {
            return null;
        }

    }
    catch (err) {
        console.log(err);
    }
}

const sendMessage = async (senderId, receiverId, message) => {
    const uri = "http://localhost:4000/conversation/add";
    try {
        const res = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ senderId, receiverId, message: { message: message } })
        })
        if (res.ok) {
            console.log("Message sent successfully");
        }
        else {
            console.log("Message failed");
        }
    } catch (err) {
        console.log(err);
    }
}

const uploadFile = async (data) => {
    const url = "http://localhost:4000/upload/file";

    try {
        const res = await fetch(url, {
            method: "POST",
            body: data
        });
        if (res.ok) {
            console.log("File uploaded successfully");
        }
        else {
            console.log("Failed to upload file");
        }
    } catch (err) {
        console.log(err);
    }
}

export { createNewUser, getUsers, getMessages, sendMessage, uploadFile };