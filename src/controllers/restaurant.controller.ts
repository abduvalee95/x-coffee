// controllerlarni doim objectlar orqali hosil qilamiz
import{ T,test } from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
const restaurantController:T ={};
import MemberService  from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enum/member.enum";

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

restaurantController.processSignup = async ( req:Request, res:Response) => { 
    try {
        console.log("processSignup");
        // memberServicedan instance olib MemSerga tenglashtiryabmiz
        // console.log('body',req.body);

        const newMember:MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        
        const memberService = new MemberService ();
        const result =  await memberService.processSignup(newMember); // instance orqali process ishga tushyabti  log ishlayabti
//todo Sessions

        res.send(result)
        } catch (error) {
            console.log("Error, processSignup",error);
            res.send(error)
        }
    };

restaurantController.processLogin = async ( req:Request, res:Response) => { 
    try {
        console.log("processLogin:restoran");
        console.log("body:", req.body);
        const input : LoginInput = req.body;

        // MemberService modelimizdan hosil qilingan object 
        const memberService = new MemberService ();
        // bu objectni yangi methodini defination qismini quramiz va objectni chaqirib olamiz
        const result = await memberService.processLogin(input)
// todo sessions

        res.send(result)
        } catch (error) {
            console.log("Error, processLogin ",error);
            // process logindan qaytgan error bu erda handle bolish kk
            res.send(error)
        }
    };

// buni routerda chaqirib olishimiz uchun export qilishimiz kerek

export default restaurantController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
