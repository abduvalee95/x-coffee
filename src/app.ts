//*                                 Imports
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: 'sessions',
  });


// **                               ENTERANCE
const app = express()
app.use(express.static(path.join(__dirname, "public", ))) // static folderlarni clientlarga ochib qoyamiz
app.use("/uploads",express.static("./uploads"))
app.use(express.urlencoded({ extended: true })); // traditional requestlarmi handle qilish uchun  html form orqali kelayotgan requestlarni  bizning serverimizga kirishga ruhsat etadi
app.use(express.json()) // kirib kelayotgan rest apilarni body qismini tashrifni amalga oshiradi 
app.use(cookieParser())
app.use(morgan((MORGAN_FORMAT)))

// **                               SESSIONS

app.use (
    session({
    secret: String(process.env.SESSION_SECRET),
  cookie: {
    maxAge: 1000 * 3600 * 3 
  },

  store: store,
  resave: true, 
  saveUninitialized: true
})
);

app.use (function (req, res, next) {
    const sessionInstance = req.session as T ; 
    res.locals.member = sessionInstance.member;
    next();
});

// **                               VIEWS

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");


// **                               ROUTING


app.use("/admin", routerAdmin);
app.use("/",router);           


export default app;