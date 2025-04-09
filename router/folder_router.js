const express = require('express')
const { getviewStore, getviewStoreFolder, postFolder, putFolder, login } = require('../controller/folder.controller')
const { folder_Schema } = require('../validations')
const auth = require('../middleware/auth')
const folderRouter = express.Router()

folderRouter.post("/login", login)

folderRouter.get("/viewstore", auth, getviewStore)
folderRouter.get("/viewstore/:folderId", auth, getviewStoreFolder)
folderRouter.post("/folders", auth, folder_Schema, postFolder)
folderRouter.put("/folders/:id", auth, folder_Schema, putFolder)
folderRouter.delete("/folders/:id", auth, putFolder)

module.exports = folderRouter