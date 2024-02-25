// controllerlarni doim objectlar orqali hosil qilamiz
import{ T,test } from "../lips/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
const restaurantController:T ={};
/* 
memberControler object hosil qiladik va bu object ichida br qator methodlar qurib olamiz 
Routerlar ichida qanday endpoint lar bor korib olamiz va
 */
// go home degan methodni tashkil qilamiz
restaurantController.goHome = ( req:Request, res:Response) => {  // mantiqni olib otamiz
    try {
    res.send('Home Page');
    } catch (error) {
        console.log("Error, goHome",error);
    }
};

restaurantController.getLogin = ( req:Request, res:Response) => { 
    try {
        res.send('Login Page');
        } catch (error) {
            console.log("Error, getLogin",error);
        }
    };

restaurantController.getSignup = ( req:Request, res:Response) => { 
    try {
        res.send('Sign-Up Page');
        } catch (error) {
            console.log("Error, getSign-Up",error);
        }
    };

// buni routerda chaqirib olishimiz uchun export qilishimiz kerek

export default restaurantController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
