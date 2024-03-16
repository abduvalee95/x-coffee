import express from "express";
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUpLoader from "./libs/utils/uploader";

const routerAdmin = express.Router();
//*                                                     Restaraunt
routerAdmin
    .get('/', restaurantController.goHome)
    .get('/login', restaurantController.getLogin)
    .post('/login', restaurantController.processLogin)

    .get('/signup', restaurantController.getSignup) 
    .post('/signup', 
    makeUpLoader("members").single("memberImage"),
    restaurantController.processSignup)

    .get('/logout', restaurantController.logout)
    .get('/check-me', restaurantController.checkout)
//*                                                     Product
    
    .get('/product/all', 
    restaurantController.verifyRestaurant,
    productController.getAllProducts)


    .post('/product/create', 
    restaurantController.verifyRestaurant,
    makeUpLoader("products").array("productImages", 5),
    productController.createNewProduct)


    .post('/product/:id',
    restaurantController.verifyRestaurant,
     productController.updateChosenProduct)
//*                                                     User

    .get("/user/all", 
                restaurantController.verifyRestaurant,
                restaurantController.getUsers
    )
    .post("/user/edit", 
                restaurantController.verifyRestaurant,
                restaurantController.updateChosenUser
    )

export default routerAdmin;