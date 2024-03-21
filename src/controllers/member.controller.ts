// controllerlarni doim objectlar orqali hosil qilamiz
import MemberService from "../models/Member.service";
import{ T} from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
import { LoginInput, MemberInput } from "../libs/types/member";
import Errors, { HttpCode } from "../libs/Errors";
const memberController:T ={};
const memberService = new MemberService ();


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
