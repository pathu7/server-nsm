const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
    version: { type: String, required: true, default: "1.0" },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
    createdAt: { type: Date, default: Date.now },
    versions: [versionSchema],
});

const Document = mongoose.model("documents", documentSchema)

module.exports = Document