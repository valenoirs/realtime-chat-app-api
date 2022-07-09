import { Schema, model } from "mongoose";
import { IChat } from "../interfaces/chat";
import { IMessage } from "../interfaces/chat";
import { TUserModel } from "../interfaces/user";

const MessageSchema: Schema = new Schema<IMessage>({
    name: {type:String, required:true},
    email: {type:String, required:true},
    message: {type:String, required:true}
},
{
    timestamps: {
        createdAt: true
    }
})

const ChatSchema: Schema = new Schema<IChat, TUserModel>({
    user: {type:[String], required:true},
    messages: [MessageSchema]
},
{
    timestamps: true
})

export const Chat = model<IChat, TUserModel>('Chat', ChatSchema)