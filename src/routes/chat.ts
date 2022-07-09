import { Router } from 'express';
import * as chat from '../controllers/chat'

export const router: Router = Router()

router.route('/')
.get(chat.getMessage)
.post(chat.sendMessage)