import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
    {
        file: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("file", codeSchema);