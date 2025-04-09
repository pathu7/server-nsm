const Document = require("../models/document.modules");
const { successResponseWithData, InternalServerErrorResponse, errorWithData, successResponse } = require("../shared/response")
const fs = require("fs")


exports.fileUpload = async (req, res) => {
    try {
        const images = req.files.file;
        let results = [];
        if (Array.isArray(images)) {
            images.map((items) => {
                const filesext = items.name.split(".");
                const fileName = `${Date.now()}file1.${filesext[1]}`;
                const filepath = `./assets/${fileName}`;
                fs.writeFileSync(filepath, items.data);
                results.push(`/assets/${fileName}`);
            });
        } else {
            const filesext = images.name.split(".");
            const fileName = `${Date.now()}file1.${filesext[1]}`;
            const filepath = `./assets/${fileName}`;
            fs.writeFileSync(filepath, images.data);
            results.push(`/assets/${fileName}`);
        }
        successResponseWithData(res, "File uploaded Successfully", results || [])
    } catch (error) {
        console.log(error);
        InternalServerErrorResponse(res, error)
    }
}


exports.getDocuments = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id)
        if (!document) {
            errorWithData(res, 'Document not found');
        }
        successResponseWithData(res, "Get Folder Data", document || [])
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}
exports.postDocuments = async (req, res) => {
    try {
        let documentData = {
            ...req.body,
            versions: [{ fileUrl: req.body.file }]
        }
        await Document(documentData).save()
        successResponse(res, "Document Created Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.postVersion = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id)
        if (!document) {
            errorWithData(res, 'Document not found');
        }
        await Document.updateOne({ _id: req.params.id }, {
            $push: {
                versions: {
                    version: req.body.versionNumber,
                    fileUrl: `${document.versions[0].fileUrl.split(".pdf")[0]}_V${req.body.versionNumber}.pdf`
                }
            }
        })
        successResponse(res, "Document Version Created Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}
exports.getVersion = async (req, res) => {
    try {
        const documents = await Document.findById(req.params.id).select("versions")
        if (!documents) {
            errorWithData(res, 'Document not found');
        }
        successResponseWithData(res, "Get Document Data", documents.versions || [])
    } catch (error) {
        console.log(error);

        InternalServerErrorResponse(res, error)
    }
}
exports.putDocuments = async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body)
        if (!document) {
            errorWithData(res, 'Document not found');
        }
        successResponse(res, "Document Updated Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}
exports.deleteDocuments = async (req, res) => {
    try {
        const document = await Document.deleteOne(req.params.id)
        if (!document) {
            errorWithData(res, 'Document not found');
        }
        successResponse(res, "Document Deleted Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.documenFilter = async (req, res) => {
    try {

        const documents = await Document.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: req.query.name, $options: 'i' } },
                        { content: { $regex: req.query.name, $options: 'i' } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'folders',
                    localField: 'folderId',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'folders',
                                localField: '_id',
                                foreignField: 'parentFolder',
                                as: 'subFolders'
                            }
                        },
                        {
                            $project: {
                                name: 1,
                                subFolders: {
                                    _id: 1,
                                    name: 1
                                }
                            }
                        }
                    ],
                    as: "folders"
                }
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    folders: 1,
                    versions: 1
                }
            }
        ])
        successResponseWithData(res, "Get Document Data", documents || [])
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.totalDocument = async (req, res) => {
    try {
        const document = await Document.countDocuments()
        successResponseWithData(res, "Get Document Count", { totalDocuments: document })
    } catch (error) {
        console.log(error);
        
        InternalServerErrorResponse(res, error)
    }
}






