import multer from "multer";
import { GridFsStorage } from 'multer-gridfs-storage';
import 'dotenv/config';

const URI = process.env.URI;

const storage = new GridFsStorage({
    url: URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if (match.indexOf(file.mimeType) === -1) {
            return {
                bucketName: "uploads",
                filename: `${Date.now()}-file-${file.originalname}`
            };
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        };
    }
});

export default multer({ storage: storage });