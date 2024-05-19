import {Request, Response} from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import Order from "../models/order";

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({user: req.userId});

        if (existingRestaurant) {
            return res.status(409).json({message: "Restaurant already exists"});
        }
        const imageUrl = await uploadImage(req.file as Express.Multer.File);

        const newRestaurant = new Restaurant(req.body);
        newRestaurant.imageUrl = imageUrl;
        newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
        newRestaurant.lastUpdated = new Date();
        await newRestaurant.save();

        return res.status(201).send(newRestaurant);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message: "Failed!"});
    }
}


const getMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"});
        }
        return res.status(200).json(restaurant);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed!"
        });
    }
}

const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"});
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryFee = req.body.deliveryFee;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        if (req.file) {
            restaurant.imageUrl = await uploadImage(req.file as Express.Multer.File);
        }

        await restaurant.save();
        res.status(200).send(restaurant);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed!"
        });
    }
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
}


const getMyRestaurantOrders = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant
            .findOne({user: req.userId});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"});
        }
        const order = await Order
            .find({restaurant: restaurant._id})
            .populate("user")
            .populate("restaurant");

        return res.status(200).json(order);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed!"
        });
    }
};


const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;

        console.log(status)

        const order = await Order
            .findById(orderId);
        if (!order) {
            return res.status(404).json({message: "Order not found"});
        }

        const restaurant = await Restaurant
            .findById(order.restaurant);

        if (restaurant?.user?._id.toString() !== req.userId) {
            return res.status(401).json({message: "Forbidden"});
        }

        order.orderStatus = status;

        await order.save();

        return res.status(200).json(order);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed!"
        });
    }
}

export default {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant,
    getMyRestaurantOrders,
    updateOrderStatus,
}