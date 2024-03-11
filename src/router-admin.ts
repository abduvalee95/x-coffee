import express from "express";
// import express,{Request,Response} from "express"; // typelariniham chaqirib olamiz
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";

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
    .get('/login', restaurantController.getLogin)
    .post('/login', restaurantController.processLogin)

    .get('/signup', restaurantController.getSignup) 
    .post('/signup', restaurantController.processSignup)

    .get('/logout', restaurantController.logout)
    .get('/check-me', restaurantController.checkout)
//*                                                     Product
    
    .get('/product/all', 
    restaurantController.verifyRestaurant,
    productController.getAllProducts)


    .post('/product/create', 
    restaurantController.verifyRestaurant,
    productController.createNewProduct)


    .post('/product/:id',
    restaurantController.verifyRestaurant,
     productController.updateChosenProduct)
//*                                                     User


export default routerAdmin;