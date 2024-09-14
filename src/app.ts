//*                                 Imports
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { MORGAN_FORMAT } from './libs/config'
import router from './router'
import routerAdmin from './router-admin'

import ConnectMongoDB from 'connect-mongodb-session'
import session from 'express-session'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { T } from './libs/types/common'

const MongoDBStore = ConnectMongoDB(session)
const store = new MongoDBStore({
	uri: String(process.env.MONGO_URL),
	collection: 'sessions',
})

// **                               ENTERANCE
const app = express()
app.use(express.static(path.join(__dirname, 'public'))) // static folderlarni clientlarga ochib qoyamiz
app.use('/uploads', express.static('./uploads'))
app.use(express.urlencoded({ extended: true })) // traditional requestlarmi handle qilish uchun  html form orqali kelayotgan requestlarni  bizning serverimizga kirishga ruhsat etadi
app.use(express.json()) // kirib kelayotgan rest apilarni body qismini tashrifni amalga oshiradi
app.use(
	cors({
		credentials: true,
		origin: true,
	})
)
app.use(cookieParser())
app.use(morgan(MORGAN_FORMAT))

// **                               SESSIONS

app.use(
	session({
		secret: String(process.env.SESSION_SECRET),
		cookie: {
			maxAge: 1000 * 3600 * 3,
		},

		store: store,
		resave: true,
		saveUninitialized: true,
	})
)

app.use(function (req, res, next) {
	const sessionInstance = req.session as T
	res.locals.member = sessionInstance.member
	next()
})

// **                               VIEWS

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// **                               ROUTING

app.use('/admin', routerAdmin)
app.use('/', router)

const server = http.createServer(app)
// butun serverni qolga olishimiz kerak git

const io = new SocketIOServer(server, {
	cors: {
		origin: true,
		credentials: true,
	},
})
let summeryClient = 0
io.on('connection', (socket) => {
	summeryClient++;
  console.log(`Connection Total[ ${summeryClient}]`);

socket.on('disconnect', (socket) => {
	summeryClient--;
  console.log(`disconetct Total[ ${summeryClient}]`)
});
});
export default server;
