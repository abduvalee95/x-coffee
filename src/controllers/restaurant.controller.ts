// controllerlarni doim objectlar orqali hosil qilamiz
import { T } from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
import MemberService  from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enum/member.enum";
import { Message } from "../libs/Errors";

const restaurantController:T ={};


restaurantController.goHome = ( req:Request, res:Response) => {  // mantiqni olib otamiz
    try {
        console.log("goHome");
    res.render('home');
    } catch (error) {
        console.log("Error, goHome",error);
    }
};

restaurantController.getLogin = ( req:Request, res:Response) => { 
    try {
        console.log("getlogin");
        res.render('login');
        } catch (error) {
            console.log("Error, getLogin",error);
        }
    };

restaurantController.getSignup = ( req:Request, res:Response) => { 
    try {
        console.log("getSingup");

        res.render('signup');
        } catch (error) {
            console.log("Error, getSign-Up",error);
        }
    };

restaurantController.processSignup = async ( req: AdminRequest, res:Response) => { 
    try {
        console.log("processSignup");


        const newMember:MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        
        const memberService = new MemberService ();
        const result =  await memberService.processSignup(newMember); 
//todo Sessions
        req.session.member = result;
        req.session.save(function () {  
            res.send(result)
        });


        
        } catch (error) {
            console.log("Error, processSignup",error);
            res.send(error)
        }
    };

restaurantController.processLogin = async ( req:AdminRequest, res:Response) => { 
    try {
        console.log("processLogin:restoran");
        console.log("body:", req.body);
        const input : LoginInput = req.body;

        const memberService = new MemberService ();
        const result = await memberService.processLogin(input)
// todo sessions
        req.session.member = result; //session memberni cookiesini ichiga sid ni joylab keladi 
        req.session.save(function () {  // bu datani saqledi 
            res.send(result)
        });
        } catch (error) {
            console.log("Error, processLogin ",error);
            res.send(error)
        }
    };


restaurantController.checkout = async ( req:AdminRequest, res:Response) => { 
    try {
        console.log("Chekout:restoran");
        if (req.session?.member) res.send(`<script> alert ("Hello ${req.session.member.memberNick}  WELCOME AGAIN ) </script>`);
        else res.send(`<script> alert ("${Message.NOT_AUTHENTICATED}") </script>`);
        } catch (error) {
            console.log("Error, processLogin ",error);
            res.send(error)
        }
    };

// buni routerda chaqirib olishimiz uchun export qilishimiz kerek

export default restaurantController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
