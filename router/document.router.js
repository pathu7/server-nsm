const express = require('express')
const { getDocuments, postDocuments, postVersion, getVersion, putDocuments, deleteDocuments, documenFilter, fileUpload, totalDocument } = require('../controller/document.controller')
const { documents_Schema, version_Schema, putdocuments_Schema } = require('../validations')
const auth = require('../middleware/auth')
const documentRouter = express.Router()


documentRouter.post("/upload", auth, fileUpload)
documentRouter.get("/documents/:id", auth, getDocuments)
documentRouter.post("/documents", auth, documents_Schema, postDocuments)
documentRouter.post("/documents/:id/version", auth, version_Schema, postVersion)
documentRouter.get("/documents/:id/version", auth, getVersion)
documentRouter.put("/documents/:id", auth, putdocuments_Schema, putDocuments)
documentRouter.delete("/documents/:id", auth, deleteDocuments)
documentRouter.get("/filter", auth, documenFilter)
documentRouter.get("/total-documents", auth, totalDocument)


module.exports = documentRouter