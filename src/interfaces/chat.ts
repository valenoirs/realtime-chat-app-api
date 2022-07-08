import { Model, Types } from "mongoose"

export interface IChat {
    sender: string,
    receiver: string
    messages: IMessage[]
}

export interface IMessage {
    name: string,
    message: string
}

type TChatProps = {
    messages: Types.DocumentArray<IMessage>
}

export type TChatModel = Model<IChat, {}, TChatProps>