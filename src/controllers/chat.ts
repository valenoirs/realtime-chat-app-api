import { Request, Response } from "express";
import { messageValidation } from "../helper/chat-validation";
import { IMessage } from "../interfaces/chat";

/**
 * 
 * @param req Express HTTP Request
 * @param res Express HTTP Response
 * @returns HTTP Response
 */
export const sendMessage = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const value: IMessage = await messageValidation.validateAsync(req.body)

        console.log(value)

        // Success
        console.log(`[server]: OK! message sent!`)
        return res.status(200).send({
            success:true,
            status: 200,
            data: {
                message: 'Message sent.'
            }
        })
    } catch (error) {
        // Error
        console.error('[server]: ERR! send message error', error)
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'SendMessageError',
            data: {
                message: 'Something went wrong while sending message, please try again.'
            }
        })
    }
}

export const getMessage = async (req: Request, res: Response) => {
    try {
        // Success
        console.log(`[server]: OK! message sent!`)
        return res.status(200).send({
            success:true,
            status: 200,
            data: {
                message: 'Message sent.'
            }
        })
    } catch (error) {
        // Error
        console.error('[server]: ERR! send message error', error)
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'SendMessageError',
            data: {
                message: 'Something went wrong while sending message, please try again.'
            }
        })
    }
}