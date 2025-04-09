const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const Folder = require("../models/folder.modules")
const { successResponse, successResponseWithData, InternalServerErrorResponse } = require("../shared/response")
const loginData = { _id: "67f577742419fdd3d6eab133", email: "email@mail.com", password: "123456789" }

exports.login = async (req, res) => {
    try {
        if (loginData.email == req.body.email && loginData.password == req.body.password) {
            const token = await jwt.sign(
                { email: loginData.email, id: loginData._id },
                "nsm"
            );
            successResponseWithData(res, "login Successfully", { token: token, data: loginData })
        } else {
            errorWithData(res, "Email or Password is wrong")
        }
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.getviewStore = async (req, res) => {
    try {
        const folder = await Folder.find({ parentFolder: null }).select("name")
        successResponseWithData(res, "Get Folder Data", folder || [])
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.getviewStoreFolder = async (req, res) => {
    try {
        const folder = await Folder.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.folderId) }
            },
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
                    "name": 1,
                    "subFolders": {
                        "_id": 1,
                        "name": 1,
                        "parentFolder": 1
                    }
                }
            }
        ])
        if (folder.length == 0) {
            errorWithData(res, 'Folder not found');
        }
        successResponseWithData(res, "Get Folder Data", folder[0] || {})
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}
exports.postFolder = async (req, res) => {
    try {
        await Folder(req.body).save()
        successResponse(res, "Folder Created Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.putFolder = async (req, res) => {
    try {
        const folder = await Folder.findByIdAndUpdate(req.params.id, req.body)
        if (!folder) {
            errorWithData(res, 'Folder not found');
        }
        successResponse(res, "Folder Updated Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}

exports.deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.deleteOne(req.params.id)
        if (!folder) {
            errorWithData(res, 'Folder not found');
        }
        successResponse(res, "Folder Deleted Successfully")
    } catch (error) {
        InternalServerErrorResponse(res, error)
    }
}
