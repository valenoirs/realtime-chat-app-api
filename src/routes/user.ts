import { Router } from 'express'
import * as user from '../controllers/user'

export const router: Router = Router()

router.post('/signin', user.signIn)
router.post('/signup', user.signUp)
router.get('/signout', user.signOut)
router.get('/verify', user.verify)