import {useAuth0} from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import UserProfileForm, {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useGetMyUser} from "@/api/MyUserApi.tsx";


type Props = {
    onCheckout: (userFormData: UserFormData) => void
    disabled: boolean
    isLoading: boolean
}


const CheckoutButton = ({onCheckout, disabled, isLoading}: Props) => {

    const {
        isAuthenticated,
        isLoading: isAuthLoading,
        loginWithRedirect
    } = useAuth0();

    const {
        currentUser,
        isLoading: isGetUserLoading,
    } = useGetMyUser()

    const { pathname} = useLocation();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        });
    }

    if (!isAuthenticated) {
        return <Button
            onClick={onLogin}
            className={`bg-blue-500 flex-1`}>
            Log In to Checkout
        </Button>
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton/>
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={disabled}
                    className={`bg-blue-500 flex-1`}
                >
                    Go to Checkout
                </Button>
            </DialogTrigger>
            <DialogContent
                className={`max-w-[425px] md:min-w-[700px] bg-gray-100`}
            >
                <UserProfileForm
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    currentUser={currentUser}
                    title="Confirm Delivery Details"
                    buttonText="Proceed to payment"
                />
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton;