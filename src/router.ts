import express from "express";
// import express,{Request,Response} from "express"; // typelariniham chaqirib olamiz
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";

const router = express.Router();

//*                                             React SPA
//*      Member

router
  .post("/member/login", memberController.login)
  .post("/member/signup", memberController.signup)
  .post("/member/logout", memberController.verifyAuth, memberController.logout)
  .get(
    "/member/detail",
    memberController.verifyAuth,
    memberController.getMemberDetail
  )
  .post(
    "/member/update",
    memberController.verifyAuth,
    uploader("members").single("memberImage"),
    memberController.updateMember
  )
  .get("/member/top-users", memberController.getTopUsers);

//*      Product

//*      Order

export default router;
