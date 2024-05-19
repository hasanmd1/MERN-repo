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
    imageUrl: string;
    lastUpdated: string;
};

export type RestaurantSearchResult = {
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}

export type OrderStatus = "placed"
    | "paid"
    | "inProgress"
    | "outForDelivery"
    | "delivered"

export type Order = {
    _id: string;
    user: User;
    restaurant: Restaurant;
    orderStatus: OrderStatus;
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: number;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
        country: string;
    };
    total: number;
    createdAt: string;
    restaurantId: string;
}