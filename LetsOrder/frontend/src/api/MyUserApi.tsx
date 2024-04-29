import {useMutation, useQuery} from "react-query";
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";
import {User} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to get user");
        }
        return response.json();
    }

    const {
        data: currentUser,
        isLoading,
        isError
    } = useQuery(
        "fetchCurrentUser",
        getMyUserRequest,
    );
    if (isError) {
        toast.error("Failed to get user");
    }
    return {
        currentUser,
        isLoading
    }
}

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    };
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
};

type UpdateUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useUpdateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateMyUserRequest = async (formData: UpdateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return response.json();
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        isError,
        error,
        reset,
    } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User updated successfully");
    }
    if (isError) {
        toast.error("Failed to update user");
        reset();
    }

    return {
        updateUser,
        isLoading,
        isSuccess,
        isError,
        error,
        reset,
    }
}
