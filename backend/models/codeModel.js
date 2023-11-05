const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model("file", fileSchema);
