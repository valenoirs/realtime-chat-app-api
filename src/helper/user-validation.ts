import Joi from "joi";

const name = Joi.string().max(30).required()
const email = Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required()
const password = Joi.string().min(5).max(30).required()
const passwordConfirmation = Joi.ref('password')

export const userSignInValidation = Joi.object().keys({
    email,
    password
})

export const userSignUpValidation = Joi.object().keys({
    name,
    email,
    password,
    passwordConfirmation
})