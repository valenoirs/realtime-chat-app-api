import config from './config/config'
import express, { Express } from 'express'
import { createServer, Server as httpServer } from 'http'
import helmet from 'helmet'
import cors from 'cors'
import { Socket, Server as ioServer } from 'socket.io'
import path from 'path'
import morgan from 'morgan'
import { connect } from 'mongoose'
import { createStream } from 'rotating-file-stream'
import { initializeWebsocket } from './helper/websocket'
import session from 'express-session'
import MongoStore from 'connect-mongo'

// Importing routes
import {router as defaultRoutes} from './routes/default'
import {router as userRoutes} from './routes/user'
import {router as chatRoutes} from './routes/chat'

// Init
const port = config.PORT
const logStream = createStream('access.log',{
    interval: '1d',
    path: path.join(__dirname, 'log')
})

// Initialize server
const app: Express = express()
const http: httpServer = createServer(app)
const io: ioServer = initializeWebsocket(http)

// Initialize MongoStore
const store: MongoStore = MongoStore.create({
    mongoUrl: config.MONGO_URI,
    collectionName: config.SESSION_COLLECTION_NAME
})

// Connectin to MongoDB
connect(config.MONGO_URI)
.then(() => console.log('[server]: OK! successfully connected to mongodb'))
.catch(error => console.error('[server]: ERR! failed connecting to mongodb', error))

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(morgan('combined', {
    stream: logStream
}))

// Session middleware
app.use(session({
    secret: config.SESSION_SECRET,
    store,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: config.SESSION_LIFETIME
    }
}))

// HTTP Routes
app.use('/api/v1/user', userRoutes)
app.use('api/v1/chat', chatRoutes)
app.use('/', defaultRoutes)

// io on connection
io.on('connection', (socket: Socket) => {
    console.log(`[server]: OK! ${socket.id} connected!`)

    socket.on('disconnect', () => {
        console.log(`[server]: OK! ${socket.id} disconnected!`)
    })
})

// Server listener
http.listen(port, () => {
    console.log(`[server]: OK! server listening to port ${port}`)
})