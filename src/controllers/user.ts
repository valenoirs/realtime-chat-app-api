import config from '../config/config'
import { Request, Response } from 'express'
import { userSignInValidation, userSignUpValidation } from '../helper/user-validation'
import { IUser } from '../interfaces/user'
import { User } from '../models/user'

/**
 * User sign in
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signIn = async (req: Request, res: Response) => {
    try {
        const value: Omit<IUser, 'name'> = await userSignInValidation.validateAsync(req.body)
        
        const {email, password} = value

        const user = await User.findOne({email})

        // Check if user exist
        if(!user){
            // Error
            console.error('[server]: ERR! user not found!')
            return res.status(401).send({
                error: true,
                status: 401,
                type: 'SignInError',
                data: {
                    message: 'User with corresponding email not found.'
                }
            })
        }

        const authenticated = user.comparePassword(password)

        // Check if user authenticated
        if(!authenticated){
            // Error
            console.error('[server]: ERR! invalid user credential!')
            return res.status(401).send({
                error: true,
                status: 401,
                type: 'SignInError',
                data: {
                    message: 'Invalid credential.'
                }
            })
        }

        // Check if user verified
        if(!user.isVerified){
            // Error
            console.error('[server]: ERR! user isn\'t verified!')
            return res.status(401).send({
                error: true,
                status: 401,
                type: 'SignInError',
                data: {
                    message: 'Please verify your email address.'
                }
            })
        }

        // Set client session
        const clientSession: Pick<IUser, 'name' | 'email'> = {
            name: user.name,
            email
        }

        req.session.user = clientSession

        // Success
        console.error('[server]: OK! user signed in!')
        return res.status(200).send({
            error: true,
            status: 200,
            data: {
                message: 'Welcome.',
                ...clientSession
            }
        })
    } catch (error) {
        // Error
        console.error('[server]: ERR! sign in error!', error)
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'SignInError',
            data: {
                message: 'Something went wrong while signing in, please try again.'
            }
        })
    }
}

/**
 * User sign up
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signUp = async (req: Request, res: Response) => {
    try {
        // Validate user sign up
        const value: IUser = await userSignUpValidation.validateAsync(req.body)
        
        const {email} = value

        // Check if same user exist
        const user = await User.findOne({email})

        if(user) {
            // Error
            console.error('[server]: ERR! user already exist!')
            return res.status(401).send({
                error: true,
                status: 401,
                type: 'SignUpError',
                data: {
                    message: 'User with corresponding email already registered.'
                }
            })
        }

        // Save new user
        await new User(value).save()

        // Success
        console.error('[server]: OK! user signed up!')
        return res.status(200).send({
            error: true,
            status: 200,
            data: {
                message: 'User signed up.'
            }
        })
    } catch (error) {
        // Error
        console.error('[server]: ERR! sign up error!', error)
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'SignUpError',
            data: {
                message: 'Something went wrong while signing up, please try again.'
            }
        })
    }
}

/**
 * Sign out user
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signOut = async (req: Request, res: Response): Promise<any> => {
    try {
        if(!req.session.user){
            console.log('[server]: ERR! no session id provided by the client!')
            return res.status(401).send({
                error: true,
                status: 401,
                type: 'SignOutError',
                data: {
                    message: 'No session id provided.'
                }
            })
        }

        req.session.destroy((error: Error) => {
            if(error) throw error;

            res.clearCookie(config.SESSION_COLLECTION_NAME)

            // Success response
            console.log(`[server]: OK! user signed out!`)
            return res.status(300).send({
                success:true,
                status: 300,
                data: {
                    message: 'See ya later.'
                }
            })
        })
    } catch (error) {
        // Error
        console.error('[server]: ERR! sign out error!', error)
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'SignOutError',
            data: {
                message: 'Something went wrong while signing out, please try again.'
            }
        })
    }
}

/**
 * Verify user account
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const verify = async (req: Request, res: Response) => {
    try {

        // Success
        console.error('[server]: OK! user signed up!')
        return res.status(200).send({
            error: true,
            status: 200,
            data: {
                message: 'User verified.'
            }
        })
    } catch (error) {
        // Error
        console.error('[server]: ERR! user verification error!', error)
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'UserVerifyError',
            data: {
                message: 'Something went wrong while verifying user, please try again.'
            }
        }) 
    }
}