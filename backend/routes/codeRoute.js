import express from "express";
import Code from "../models/codeModel.js";
import multer from "multer";
import path from "path";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const codeStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname}`);
    },
});

const isJavaFile = (req, file, callback) => {
    if (path.extname(file.originalname).toLowerCase() === ".java") {
        callback(null, true);
    } else {
        callback(new Error("Only Java files (.java) are allowed"));
    }
};

const upload = multer({
    storage: codeStorage,
    fileFilter: isJavaFile,
});

router.post('/file/save', upload.single("file"), (req, res) => {
    const userId = req.body.userId;
    const file = req.file ? req.file.filename : '';

    if (!file) {
        return res.status(400).json({
            error: 'No file uploaded',
        });
    }

    const newCode = new Code({
        userId,
        file,
    });

    newCode.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err.message,
            });
        }
        return res.status(200).json({
            success: "File saved successfully",
        });
    });
});

router.get('/user/codes', requireSignIn, (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated request

    Code.find({ userId })
        .then((codes) => {
            res.json(codes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

router.route("/code").get((req, res) => {
    Code.find().then((codes) => {
        res.json(codes)
    }).catch((err) => {
        console.log(err);
    })
})

router.get("/file/download/:fileName", (req, res) => {
    const filePath = path.join(__dirname, "../../client/public/uploads", req.params.fileName);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

export default router;
