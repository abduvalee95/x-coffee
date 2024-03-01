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
import express from "express"
import path from "path"
import router from "./router"
import routerAdmin from "./router-admin"
import morgan from "morgan"
import { MORGAN_FORMAT } from "./libs/config"


// **                               ENTERANCE
const app = express()
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(morgan((MORGAN_FORMAT))) //GET /admin 2.868 [304] get boldi shu adminga sts 304
// **                               SESSIONS


// **                               VIEWS
app.set('views',path.join(__dirname,"views"))
app.set("view engine", 'ejs')


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