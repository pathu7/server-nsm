const Joi = require("joi")
const { errorData } = require("../shared/response")

const folder_Schema = (req, res, next) => {
    const Schema = Joi.object().keys({
        name: Joi.string().required().messages({
            'string.base': 'Name must be a string.',    // Custom message for string validation
            'any.required': 'Name is required.'         // Custom message for required field validation
        }),
        parentFolder: Joi.string().allow('')
    }).unknown(false)
    const { error } = Schema.validate(req.body, { abortEarly: false })
    if (error) {
        const { details } = error
        errorData(res, details)
    } else {
        next()
    }
}

const documents_Schema = (req, res, next) => {
    const Schema = Joi.object().keys({
        title: Joi.string().required().messages({
            'string.base': 'Title must be a string.',    // Custom message for string validation
            'any.required': 'Title is required.'         // Custom message for required field validation
        }),
        content: Joi.string().required().messages({
            'string.base': 'Content must be a string.',    // Custom message for string validation
            'any.required': 'Content is required.'         // Custom message for required field validation
        }),
        folderId: Joi.string().required().messages({
            'string.base': 'folder Id must be a string.',    // Custom message for string validation
            'any.required': 'folder Id is required.'         // Custom message for required field validation
        }),
        file: Joi.string().required().messages({
            'string.base': 'file must be a string.',    // Custom message for string validation
            'any.required': 'file is required.'         // Custom message for required field validation
        }),

    }).unknown(false)
    const { error } = Schema.validate(req.body, { abortEarly: false })
    if (error) {
        const { details } = error
        errorData(res, details)
    } else {
        next()
    }
}

const version_Schema = (req, res, next) => {
    const Schema = Joi.object().keys({
        versionNumber: Joi.string().required().messages({
            'string.base': 'version Number must be a string.',    // Custom message for string validation
            'any.required': 'version Number is required.'         // Custom message for required field validation
        }),
    }).unknown(false)
    const { error } = Schema.validate(req.body, { abortEarly: false })
    if (error) {
        const { details } = error
        errorData(res, details)
    } else {
        next()
    }
}
const putdocuments_Schema = (req, res, next) => {
    const Schema = Joi.object().keys({
        title: Joi.string().required().messages({
            'string.base': 'Title must be a string.',    // Custom message for string validation
            'any.required': 'Title is required.'         // Custom message for required field validation
        }),
        content: Joi.string().required().messages({
            'string.base': 'Content must be a string.',    // Custom message for string validation
            'any.required': 'Content is required.'         // Custom message for required field validation
        }),
    }).unknown(false)
    const { error } = Schema.validate(req.body, { abortEarly: false })
    if (error) {
        const { details } = error
        errorData(res, details)
    } else {
        next()
    }
}

module.exports = { folder_Schema, documents_Schema, version_Schema,putdocuments_Schema }