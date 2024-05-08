export type User = {
    _id: string;
    name: string;
    addressLine1: string;
    email: string;
    city: string;
    country: string;
}

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
}

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryFee: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageFile: string;
    lastUpdated: string;
}