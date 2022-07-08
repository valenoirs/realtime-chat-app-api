import { Model } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    code: string,
    codeExpires: Date | null
}

export interface IUserMethod {
    comparePassword(password: string): boolean
}

export type TUserModel = Model<IUser, {}, IUserMethod>