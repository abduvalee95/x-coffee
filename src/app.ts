/*

import express from "express"
import path from "path" // core package 

// **                               ENTERANCE
const app = express()

console.log("__dirname",__dirname); // dirname qiymatni korish
// __dirname /Users/leo/Desktop/burak/src manzilni korstatib beryabti shu asosida join qilamiz
// va "public" folderni staticga aylantirib beradi
app.use(express.static(path.join(__dirname,"public")))// midlware pattern
//path orqali manzilni kiritamiz
app.use(express.urlencoded({ extended:true }));
app.use(express.json()); //rest api da kelyatgan datalarni json datani otkazishga ruhsat beryabmiz
// **                               SESSIONS


// **                               VIEWS
//express da aynan view ejs ni iwlatishini aytamiz
app.set('views',path.join(__dirname,"views"))
app.set("view engine", 'ejs') // view engine ejs ekanligini bildiramiz


// **                               ROUTING


// ishga tushurish uchun export qilamiz

export default app;  //module.exports = app;  commonJS

*/
//*                                 Imports
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

import dotenv from "dotenv";
dotenv.config();


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
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(morgan((MORGAN_FORMAT))) //GET /admin 2.868 [304] get boldi shu adminga sts 304
// **                               SESSIONS
app.use (
    // ichiga optionlar berib olamiz
    session({
    secret: String(process.env.SESSION_SECRET),
  cookie: {
    maxAge: 1000 * 3600 * 3 // 3 HR = BU QANCHA VAQT AMAL QILISHINI ANGLATADI
  },
  //SESSION: xosil bolganda sess collectionga murojat etadi
  store: store,
  // resave agar false bolsa  10:30 => authenticated 13:30 ; kech kirsayam ohirgi mudati 13.30 bolib qolaveradi obnovit bolib turmidi
  resave: true, // session vaqtni obnovit qilib turadi
  saveUninitialized: true
})
);

app.use (function (req, res, next) {
    const sessionInstance = req.session as T ; 
    res.locals.member = sessionInstance.member;
    next();
});

// **                               VIEWS
app.set('views',path.join(__dirname,"views"));
app.set("view engine", 'ejs');


// **                               ROUTING

// app.use('/',router)// Midlleware Design Pattern 
/* 
'/'mana shu erda integrasiya bolya dan kelayotgan requestlarni 
router  folderimizga yonaltiryabti 
va buning vazifasi manashu erda tugaydi

*/

app.use('/admin', routerAdmin); // SSR:EJS
app.use('/',router);           // SPA: REACT




export default app;