import Joi from "joi";

const user = Joi.string().min(1).required()
const email = Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}}).required()
const message = Joi.string().min(1).required()

export const messageValidation = Joi.object().keys({
    user,
    email,
    message
})