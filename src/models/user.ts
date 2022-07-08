import config from '../config/config'
import { Schema, model } from "mongoose"
import { IUser, IUserMethod, UserModel } from '../interfaces/user'
import { hashSync, compareSync } from 'bcrypt'

const UserSchema: Schema = new Schema<IUser, UserModel, IUserMethod>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
},
{
    timestamps: true
})

UserSchema.pre('save', function(next: any){
    if(this.isModified('password')){
        this.password = hashSync(this.password, config.SALT)
    }

    next()
})

UserSchema.method('comparePassword' ,function comparePassword(password) {
    return compareSync(password, this.password)
})

export const User = model<IUser, UserModel>('User', UserSchema)