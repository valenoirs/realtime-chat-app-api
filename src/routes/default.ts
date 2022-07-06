import { Request, Response, Router } from 'express';

export const router: Router = Router()

router.get('/ping', (req: Request, res: Response) => {
    console.log(`[server]: OK! ${req.headers.host} pinging the server`)
    res.status(200).send({
        success:true,
        status: 200,
        data: {
            message: 'valenoirs',
        }
    })
})

// 404 route
router.use('/', (req: Request, res: Response) => {
    console.log(`[server]: OK! ${req.headers.host} accessing 404 route`)
    res.status(404).send({
        error: true,
        status: 404,
        type: 'NotFound',
        data: {
            message: 'No API endpoint found.'
        }
    })
})