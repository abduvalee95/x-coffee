// controllerlarni doim objectlar orqali hosil qilamiz
import MemberService from "../models/Member.service";
import{ T} from "../libs/types/common" // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { Request,Response } from "express";
import { LoginInput, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../schema/Auth.service";
import { AUTH_TIMER } from "../libs/config";

// 
const memberController: T = {},
    memberService = new MemberService(),
    authService = new AuthService();


//*                                     Signup

memberController.signup = async ( req:Request, res:Response) => { 
    try {
        console.log("Signup");
        const input: MemberInput = req.body,
            result = await memberService.signup(input),
            token = await authService.createToken(result);
        
            res.cookie("accessToken", token, {
                maxAge: AUTH_TIMER * 3600 * 1000,
                httpOnly: false
            });

              res.status(HttpCode.CREATED).json({member: result, accessToken: token});
        } catch (error) {
            console.log("Error, Signup",error);
            if (error instanceof Errors) res.status(error.code).json(error);
            else res.status(Errors.standart.code).json(Errors.standart);
        }
    };

//*                                     Login 

memberController.login = async ( req:Request, res:Response) => { 
    try {

        console.log("Login:");
        console.log("body:", req.body);

        const input : LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);
            console.log(token);
            
        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false
        });

        res.status(HttpCode.OK).json({member: result, accessToken: token});
        } catch (error) {
            console.log("Error, Login ",error);
            if (error instanceof Errors) res.status(error.code).json(error);
            else res.status(Errors.standart.code).json(Errors.standart);
        }
};
    
memberController.verifyAuth = async (req:Request, res:Response) => {
    try {
        let member = null
        const token = req.cookies["accessToken"];
        if (token) member = await authService.checkAuth(token)
        
        if (!member)
            throw new Errors(HttpCode.UNAUTHORITHED, Message.NOT_AUTHENTICATED)

        res.status(HttpCode.OK).json({member: member});
        

    } catch (error) {
        console.log("Error, verifyAuth ",error);
        if (error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}




export default memberController;
 // default bolganda yahslit qilib olyabmiz
// default ishlatsa fayli qaytarayotgan qiymatni umumiy olish mumkin boladi 
