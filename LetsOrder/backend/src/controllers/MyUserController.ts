import {Request, Response} from "express";
import User from "../models/user";

const createdCurrentUser = async (req: Request, res: Response) => {
    try {
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});

        if (existingUser) {
            return res.status(200).send();
        }

        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json(newUser.toObject());
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message: "Error creating user"});
    }
}

const updatedCurrentUser = async (req: Request, res: Response) => {
    try {
        const {auth0Id, name, addressLine1, city, country} = req.body;
        const updatedUser = await User.findById(req.userId);

        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }

        updatedUser.name = name;
        updatedUser.addressLine1 = addressLine1;
        updatedUser.city = city;
        updatedUser.country = country;

        await updatedUser.save();



        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message: "Error updating user"});
    }
}


export default {
    createdCurrentUser,
    updatedCurrentUser,
};