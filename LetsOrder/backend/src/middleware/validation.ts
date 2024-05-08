import {body, validationResult} from "express-validator";

import {Request, Response, NextFunction} from "express";

const handleValidationErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

export const validateMyUserRequest = [
    body("name")
        .isString()
        .notEmpty()
        .withMessage("Name must be a string"),
    body("addressLine1")
        .isString()
        .notEmpty()
        .withMessage("AddressLine1 must be a string"),
    body("city")
        .isString()
        .notEmpty()
        .withMessage("City must be a string"),
    body("country")
        .isString()
        .notEmpty()
        .withMessage("Country must be a string"),

    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    body("restaurantName")
        .notEmpty()
        .withMessage("Restaurant Name must be a string"),
    body("deliveryFee")
        .isFloat({min: 0})
        .withMessage("delivery Fee must be a positive number"),
    body("city")
        .notEmpty()
        .withMessage("City must be a string"),
    body("country")
        .notEmpty()
        .withMessage("Country must be a string"),
    body("estimatedDeliveryTime")
        .isInt({min: 0})
        .withMessage("Estimated Delivery Time must be a Valid Number"),
    body("cuisines")
        .isArray()
        .withMessage("Cuisines must be an array")
        .not()
        .isEmpty()
        .withMessage("Cuisines cannot be empty"),
    body("menuItems")
        .isArray()
        .withMessage("Menu Items must be an array"),

    body("menuItems.*.name")
        .notEmpty()
        .withMessage("Menu Item Name cannot be empty"),

    body("menuItems.*.price")
        .isFloat({min: 0})
        .withMessage("Menu Item Price must be a positive number"),

    handleValidationErrors,
];