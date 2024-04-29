import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi.tsx";

const MyComponent = () => {
    const {
        currentUser,
        isLoading: isGetLoading,
    } = useGetMyUser();
    const {
        updateUser,
        isLoading: isUpdateLoading,
    } = useUpdateMyUser();

    if (!currentUser) {
        return <span>No user found</span>;
    }

    if (isGetLoading) {
        return <span>Loading...</span>;
    }

    return (
        <div>
            <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>

        </div>
    );
};

export default MyComponent;
