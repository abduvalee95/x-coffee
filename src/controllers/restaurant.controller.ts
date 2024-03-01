// controllerlarni doim objectlar orqali hosil qilamiz
import{ T,test } from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
const restaurantController:T ={};
import MemberService  from "../models/Member.service";

/* 
memberControler object hosil qiladik va bu object ichida br qator methodlar qurib olamiz 
Routerlar ichida qanday endpoint lar bor korib olamiz va
 */
// go home degan methodni tashkil qilamiz
restaurantController.goHome = ( req:Request, res:Response) => {  // mantiqni olib otamiz
    try {
        console.log("goHome");
    res.send('Home Page');
    } catch (error) {
        console.log("Error, goHome",error);
    }
};

restaurantController.getLogin = ( req:Request, res:Response) => { 
    try {
        console.log("getlogin");
        res.send('Login Page');
        } catch (error) {
            console.log("Error, getLogin",error);
        }
    };

restaurantController.getSignup = ( req:Request, res:Response) => { 
    try {
        console.log("getSingup");

        res.send('Sign-Up Page');
        } catch (error) {
            console.log("Error, getSign-Up",error);
        }
    };

restaurantController.processSignup = ( req:Request, res:Response) => { 
    try {
        console.log("processSignup");

        res.send('processSignup');
        } catch (error) {
            console.log("Error, processSignup",error);
        }
    };

restaurantController.processLogin = ( req:Request, res:Response) => { 
    try {
        console.log("processLogin");
        res.send("done!")
        } catch (error) {
            console.log("Error, processLogin ",error);
        }
    };

// buni routerda chaqirib olishimiz uchun export qilishimiz kerek

export default restaurantController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
