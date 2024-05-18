import express from "express";
import {param} from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get(
    "/:restaurantId",
    param("restaurantId")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Restaurant Not Found"),
    RestaurantController.getRestaurant
)

router.get(
    "/search/:city",
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("City must be valid string"),
    RestaurantController.searchRestaurants
);


export default router;