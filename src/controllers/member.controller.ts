// controllerlarni doim objectlar orqali hosil qilamiz
import MemberService from "../models/Member.service";
import{ T,test } from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
import { LoginInput, MemberInput } from "../libs/types/member";
import Errors, { HttpCode } from "../libs/Errors";
const memberController:T ={};
const memberService = new MemberService ();



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

//*                                     React SPA

memberController.signup = async ( req:Request, res:Response) => { 
    try {
        console.log("Signup");
        const input:MemberInput = req.body,
              result =  await memberService.signup(input); // instance orqali process ishga tushyabti  log ishlayabti
            // todo tokens

              res.json({member: result});
        } catch (error) {
            console.log("Error, Signup",error);
            if (error instanceof Errors) res.status(error.code).json(error);
            else res.status(Errors.standart.code).json(Errors.standart);
        }
    };

memberController.login = async ( req:Request, res:Response) => { 
    try {

        console.log("Login:");
        console.log("body:", req.body);

        const input : LoginInput = req.body,
                result = await memberService.login(input);
        // todo token
        res.json({member: result});
        } catch (error) {
            console.log("Error, Login ",error);
            if (error instanceof Errors) res.status(error.code).json(error);
            else res.status(Errors.standart.code).json(Errors.standart);
        }
    };




export default memberController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
