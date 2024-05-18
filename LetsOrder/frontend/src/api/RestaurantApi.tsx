import {useQuery} from "react-query";
import {Restaurant, RestaurantSearchResult} from "@/types.ts";
import {SearchState} from "@/pages/SearchPage.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const useGetRestaurant = (
    restaurantId?: string
) => {
    const getMyRestaurantById = async (): Promise<Restaurant> => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/${restaurantId}`,
        )

        if (!response.ok) {
            throw new Error('Failed to get any restaurant')
        }
        return response.json();
    }

    const {
        data: restaurant,
        isLoading
    } = useQuery("fetchRestaurant",
        getMyRestaurantById, {
            enabled: !!restaurantId
        }
    )

    return {
        restaurant,
        isLoading,
    }
}


export const useSearchRestaurant = (
    searchState : SearchState,
    city ?: string
) => {
    const param = new URLSearchParams()

    console.log(searchState.searchQuery, searchState.selectedCuisine.join(','))

    param.set("searchQuery", searchState.searchQuery)
    param.set("page", searchState.page.toString())
    param.set("selectedCuisines", searchState.selectedCuisine.join(','))
    param.set("sortOptions", searchState.sortOptions)

    const createSearchRequest = async (): Promise<RestaurantSearchResult> => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${param.toString()}`,
        );

        if (!response.ok) {
            throw new Error('Failed to get any restaurant')
        }
        return response.json();
    }

    const {
        data: results,
        isLoading,
    } = useQuery(
        ["searchRestaurants", city, searchState],
        createSearchRequest,
        {
            enabled: !!city
        }
    );

    return {
        results,
        isLoading,
    };

}