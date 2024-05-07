// controllerlarni doim objectlar orqali hosil qilamiz
import { T } from "../libs/types/common"; // .. tashqariga chiqib lipsga boramiz va T interface ni qolga olib beradi
import { NextFunction, Request, Response } from "express";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enum/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const restaurantController: T = {};
const memberService = new MemberService();

//*                                     HomePage

restaurantController.goHome = (req: Request, res: Response) => {
  // mantiqni olib otamiz
  try {
    console.log("goHome");
    res.render("home");
  } catch (error) {
    res.redirect("/admin");
  }
};

//*                                     Get-Signup

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSingup");

    res.render("signup");
  } catch (error) {
    res.redirect("/admin");
  }
};

//*                                      Get-login

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getlogin");
    res.render("login");
  } catch (error) {
    res.redirect("/admin");
  }
};

//*                                   processSignup

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processSignup");
    const file = req.file;
    console.log(req.body);

    console.log(file);
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (error) {
    console.log("Error, processSignup", error);
    const message =
      error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/signup') </script>`
    );
  }
};
//*                                    processLogin

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processLogin:restoran");
    console.log("body:", req.body);
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);
    req.session.member = result; //session memberni cookiesini ichiga sid ni joylab keladi
    req.session.save(function () {
      // bu datani saqledi
      res.redirect("/admin/product/all");
    });
  } catch (error) {
    console.log("Error, processLogin ", error);
    const message =
      error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};

//*                                     Logout

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("Logout:restoran");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (error) {
    console.log("Error, processLogout ", error);
    res.redirect("/admin");
  }
};

//*                                     getUser

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUser");

    const result = await memberService.getUsers();
    console.log("result:", result);

    res.render("users", { users: result });
  } catch (error) {
    res.redirect("/admin/login");
  }
};

//*                                     updateChosenUser

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);
    console.log(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (error) {
    console.log("Error:", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                     Checkout

restaurantController.checkout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("Chekout:restoran");
    if (req.session?.member)
      res.send(
        `<script> alert ("Hello ${req.session.member.memberNick}  WELCOME AGAIN ) </script>`
      );
    else res.send(`<script> alert ("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (error) {
    console.log("Error, processLogin ", error);
    res.send(error);
  }
};

//*                                     Verify

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  // agar kiruvchini typi member restaraunga teng bolsa keyngi jarayonga otkazib yuboradi
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};

export default restaurantController;
