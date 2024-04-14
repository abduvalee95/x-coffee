import express from "express";
// import express,{Request,Response} from "express"; // typelariniham chaqirib olamiz
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

const router = express.Router();

//*                                             React SPA
//*      Member

router
  .get("/member/restaurant", memberController.getRestaurant)
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
  .get("/member/top-users", memberController.getTopUsers)

  //*      Product

  .get("/product/all", productController.getProducts)
  .get(
    "/product/:id",
    memberController.retrieveyAuth,
    productController.getProduct
  )

  //*      Order
  .post(
    "/order/create",
    memberController.verifyAuth,
    orderController.createOrder
  )
  .get("/order/all", memberController.verifyAuth, orderController.getMyOrders)
  .post(
    "/order/update",
    memberController.verifyAuth,
    orderController.updateOrder
  );

export default router;
