import { Model } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    isVerified: boolean
}

export interface IUserMethod {
    comparePassword(password: string): boolean
}

export type UserModel = Model<IUser, {}, IUserMethod>