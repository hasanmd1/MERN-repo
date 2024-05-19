import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "react-query";
import {toast} from "sonner";
import {Order, Restaurant} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurant = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        })
        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();

    }
    const {
        data: restaurant,
        isLoading
    } = useQuery("fetchMyRestaurant", getMyRestaurant);


    return {
        restaurant,
        isLoading,
    }
}

export const useCreateMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createMyRestaurant = async (
        restaurantFormData: FormData
    ): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: (restaurantFormData),
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }
        return response.json();
    };


    const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createMyRestaurant);

    if (isSuccess) {
        toast.success("Restaurant created successfully");
    }

    if (error) {
        toast.error("Failed to update restaurant");
        console.error(error);
    }

    return {
        createRestaurant,
        isLoading,
    };

}

export const useUpdateMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateMyRestaurant = async (
        restaurantFormData: FormData
    ): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: (restaurantFormData),
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }
        return response.json();
    };


    const {mutate: updateRestaurant, isLoading, isSuccess, error} = useMutation(updateMyRestaurant);

    if (isSuccess) {
        toast.success("Restaurant updated successfully");
    }

    if (error) {
        toast.error("Failed to update restaurant");
        console.error(error);
    }

    return {
        updateRestaurant,
        isLoading,
    };

}

export const useGetMyRestaurantOrders = () => {

    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurantOrders = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            method: "GET",
            headers: {
                ContentType: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        })
        if (!response.ok) {
            throw new Error("Failed to get orders");
        }
        return response.json();
    }
    const {
        data: orders,
        isLoading
    } = useQuery(
        "fetchMyRestaurantOrders",
        getMyRestaurantOrders
    );

    return {
        orders,
        isLoading
    }

};


type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}
export const useUpdateOrderStatus = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateOrderStatus = async (updateStatusOrderRequest: UpdateOrderStatusRequest): Promise<Order> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({status: updateStatusOrderRequest.status}),
        })
        if (!response.ok) {
            throw new Error("Failed to update order status");
        }
        return response.json();
    }

    const {
        mutateAsync: updateRestaurantStatus,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateOrderStatus);

    if (isSuccess) {
        toast.success("Order status updated successfully");
    }

    if (error) {
        toast.error("Failed to update order status");
        reset();
        console.error(error);
    }

    return {
        updateRestaurantStatus,
        isLoading,
    };

};
