const express = require('express')
const folderRouter = require('./folder_router');
const documentRouter = require('./document.router');  
const { successResponse } = require('../shared/response');
const router = express.Router()

router.use("/api", folderRouter)
router.use("/api", documentRouter)


router.get("/", (req, res) => {
    successResponse(res,"GET request received!");
});

module.exports = router