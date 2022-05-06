import mongoose from "mongoose";
//Model is basically a class in OOP for secured output

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    comments: { type: [String], default: [] },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('PostMessage', postSchema)

