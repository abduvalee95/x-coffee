// controllerlarni doim objectlar orqali hosil qilamiz
import{ T,test } from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
const memberController:T ={};
/* 
memberControler object hosil qiladik va bu object ichida br qator methodlar qurib olamiz 
Routerlar ichida qanday endpoint lar bor korib olamiz va
 */
// go home degan methodni tashkil qilamiz
/* 
memberController.goHome = ( req:Request, res:Response) => {  // mantiqni olib otamiz
    try {
    res.send('Home Page');
    } catch (error) {
        console.log("Error, goHome",error);
    }
};

memberController.getLogin = ( req:Request, res:Response) => { 
    try {
        res.send('Login Page');
        } catch (error) {
            console.log("Error, getLogin",error);
        }
    };

memberController.getSignup = ( req:Request, res:Response) => { 
    try {
        res.send('Sign-Up Page');
        } catch (error) {
            console.log("Error, getSign-Up",error);
        }
    };
 */
// buni routerda chaqirib olishimiz uchun export qilishimiz kerek

//*                                     React

export default memberController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
