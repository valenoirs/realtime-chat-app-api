import { Model, Types } from "mongoose"

export interface IChat {
    user: Types.Array<string>,
    messages: IMessage[]
}

export interface IMessage {
    name: string,
    email: string,
    message: string
}

type TChatProps = {
    messages: Types.DocumentArray<IMessage>
}

export type TChatModel = Model<IChat, {}, TChatProps>