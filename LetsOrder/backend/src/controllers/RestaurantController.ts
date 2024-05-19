import {Request, Response} from "express";
import Restaurant from "../models/restaurant";


const getRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"});
        }

        return res.json(restaurant);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Encountered error"});
    }
}

const searchRestaurants = async (req: Request, res: Response) => {
    try {
        const city = req.params.city;


        const searchQuery = req.query.searchQuery as string || '';
        const selectedCuisines = req.query.selectedCuisines as string || '';
        const sortOptions = req.query.sortOptions as string || 'lastUpdated';
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {}

        query['city'] = new RegExp(city, 'i');
        const cityCheck = await Restaurant.countDocuments(query);

        if (cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                }
            });
        }

        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines
                .split(',')
                .map((cuisine) => new RegExp(cuisine, 'i'));

            query['cuisines'] = {$all: cuisinesArray};
        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, 'i');
            query['$or'] = [
                {'restaurantName': searchRegex},
                {'cuisines': {$in: searchRegex}},
            ]
        }

        const pageSize = 10;
        const skip = (page - 1) * pageSize;


        const restaurant = await Restaurant
            .find(query)
            .sort({[sortOptions]: 1})
            .skip(skip)
            .limit(pageSize)
            .lean();

        const total = await Restaurant.countDocuments(query);

        const response = {
            data: restaurant,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            }
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({message: "Failed!"});
        console.log(err);
    }
};

export default {
    searchRestaurants,
    getRestaurant,
};