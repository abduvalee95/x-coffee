// controllerlarni doim objectlar orqali hosil qilamiz
import { T } from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { NextFunction, Request,Response } from "express";
import MemberService  from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enum/member.enum";
import Errors, { Message } from "../libs/Errors";

const restaurantController:T ={};

//*                                     HomePage


restaurantController.goHome = ( req:Request, res:Response) => {  // mantiqni olib otamiz
    try {
        console.log("goHome");
    res.render('home');
    } catch (error) {
        res.redirect('/admin')
    }
};

//*                                     Get-Signup

restaurantController.getSignup = ( req:Request, res:Response) => { 
    try {
        console.log("getSingup");

        res.render('signup');
        } catch (error) {
            res.redirect('/admin')
        }
    };   
    
//*                                      Get-login

restaurantController.getLogin = ( req:Request, res:Response) => { 
    try {
        console.log("getlogin");
        res.render('login');
        } catch (error) {
            res.redirect('/admin')
        }
    };



//*                                     Signup

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
            const message = 
            error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG 
            res.send(`<script> alert ("${message}"); window.location.replace('/admin/signup') </script>`);
        }
    };
//*                                    Post-Login

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
            const message = 
            error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG 

            res.send(`<script> alert ("${message}"); window.location.replace('/admin/login') </script>`);

        }
    };

//*                                     Logout

restaurantController.logout = async ( req:AdminRequest, res:Response) => { 
    try {

        console.log("Logout:restoran");
        req.session.destroy(function() {
            res.redirect('/admin')
        })
        } catch (error) {
            console.log("Error, processLogout ",error);
            res.redirect('/admin')
        }
    };

//*                                     Checkout

restaurantController.checkout = async ( req:AdminRequest, res:Response) => { 
    try {
        
        console.log("Chekout:restoran");
        if (req.session?.member) res.send(`<script> alert ("Hello ${req.session.member.memberNick}  WELCOME AGAIN ) </script>`);
        else res.send(`<script> alert ("${Message.NOT_AUTHENTICATED}") </script>`);
        } catch (error) {
            console.log("Error, processLogin ",error);
            res.send(error);
        }
    };

//*                                     Verify

restaurantController.verifyRestaurant = (req : AdminRequest, res : Response, next : NextFunction) => {
// agar kiruvchini typi member restaraunga teng bolsa keyngi jarayonga otkazib yuboradi
        if (req.session?.member?.memberType === MemberType.RESTAURANT) {
          req.member = req.session.member;
          next();
        } else {
        const message = Message.NOT_AUTHENTICATED
        res.send(
            `<script> alert ("${message}"); window.location.replace('/admin/signup'); </script>`
            );
    }
}


export default restaurantController;