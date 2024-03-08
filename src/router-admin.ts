import express from "express";
// import express,{Request,Response} from "express"; // typelariniham chaqirib olamiz
import restaurantController from "./controllers/restaurant.controller";

const routerAdmin = express.Router();
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

//*                                                     Restaraunt
routerAdmin
            .get('/', restaurantController.goHome)  // endpoint admin dan boshlansagina adminga yuboradi
            .get('/login', restaurantController.getLogin)// login endpoint membercontroller ni getLogin degan mantiqgiga borsin deyabmiz 
            .post('/login', restaurantController.processLogin)
            .get('/signup', restaurantController.getSignup) //*SignUp
            .post('/signup', restaurantController.processSignup) 

//*                                                     Product

//*                                                     User


export default routerAdmin;