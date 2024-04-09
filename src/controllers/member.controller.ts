// controllerlarni doim objectlar orqali hosil qilamiz
import MemberService from "../models/Member.service";
import { T } from "../libs/types/common"; // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest, LoginInput, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../schema/Auth.service";
import { AUTH_TIMER } from "../libs/config";

//
const memberController: T = {},
  memberService = new MemberService(),
  authService = new AuthService();

//*                                     getRestaurant

memberController.getRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("getRestaurant");
    const result = await memberService.getRestaurant()
    
      res.status(HttpCode.OK).json(result)
  } catch (error) {
    console.log("Error, Signup", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};




//*                                     Signup

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("Signup");
    const input: MemberInput = req.body,
      result = await memberService.signup(input),
      token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
  } catch (error) {
    console.log("Error, Signup", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                     Login

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("Login:");
    console.log("body:", req.body);

    const input: LoginInput = req.body,
      result = await memberService.login(input),
      token = await authService.createToken(result);
    console.log(token);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (error) {
    console.log("Error, Login ", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                     LogOut

memberController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    console.log("Logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ Logout: true });
  } catch (error) {
    console.log("Error, Logout", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                     getMemberDetail

memberController.getMemberDetail = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMemberDetail");
      const result = await memberService.getMemberDetail(req.member);
      
    res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.log("Error, getMemberDetail", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                     UpdateMember

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("updateMember");
        const input: MemberUpdateInput = req.body;
        if (req.file) input.memberImage = req.file.path.replace(/\\/, "/");
      const result = await memberService.updateMember(req.member, input);
          
      res.status(HttpCode.OK).json(result);
      } catch (error) {
        console.log("Error, updateMember", error);
        if (error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standart.code).json(Errors.standart);
      }
    
}



//*                                     getTopUser

memberController.getTopUsers = async (req: Request, res: Response) => {
  try {
    console.log("getTopUser");
    const result = await memberService.getTopUsers();
    
    res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.log("Error, getTopUser", error);
        if (error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standart.code).json(Errors.standart);
  }
}


//*                                     varifyAuth

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORITHED, Message.NOT_AUTHENTICATED);

    next();
  } catch (error) {
    console.log("Error, verifyAuth ", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                     retrieveAuth

memberController.retrieveyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    next();
  } catch (error) {
    console.log("Error, verifyAuth ", error);
    if (error instanceof Errors) res.status(error.code).json(error);

    next();
  }
};

export default memberController;
