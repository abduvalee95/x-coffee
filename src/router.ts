import express from "express";
// import express,{Request,Response} from "express"; // typelariniham chaqirib olamiz
import memberController from "./controllers/member.controller";

const router = express.Router();
// va manashu instancdan foydalanib get post methodlarini amalga oshirishimiz m-m

//bu erda 2ta argument kirgizilishi kk 1 chi argument api ni url hisoblaniladi 
//get esa method hisoblaniadi 3 chisida kelayotgan requestni qabul qilishimiz m-m
/* 
router.get('/',(req:Request, res:Response) => {
    res.send("Home Page"); // response qabul qilib olib tekshirib olamiz
});

router.get('/login',(req:Request, res:Response) => {
    res.send("Login Page");
});


router.get('/signup',(req:Request, res:Response) => {
    res.send("Singn-Up Page");
});
 */

// Routerni endi Controlerlar orqalik handle qilsak 
// routerlarni get methodi orqalik olib unga url taqdim etyabmiz / url bn kirsak go homega yuboryabti req,res ni qabul qiladi automatic
// "router" yonalish beradigon (routing'yonalish korsatuvchi','marshrutizator') 
/* 
router.get('/', memberController.goHome)
router.get('/login', memberController.getLogin)// login endpoint membercontroller ni getLogin degan mantiqgiga borsin deyabmiz 
router.get('/signup', memberController.getSignup)
 */

//*                                             React SPA

router.post("/login", memberController.login)

      .post ("/signup", memberController.signup);


export default router