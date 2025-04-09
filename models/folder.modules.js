const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
}, { timestamps: true });

const Folder = mongoose.model("folder", folderSchema)

module.exports = Folder