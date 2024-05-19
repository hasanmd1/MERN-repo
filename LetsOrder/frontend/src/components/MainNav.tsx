import {Button} from "@/components/ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";
import UsernameMenu from "@/components/UsernameMenu.tsx";
import {Link} from "react-router-dom";

const MainNav = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ?
                (<>
                    <Link
                        className="font-bold hover:text-blue-500 hover:bg-white"
                        to={`/order-status`}
                    >
                        Order Status
                    </Link>
                    <UsernameMenu/>
                </>)
                :
                <Button
                    variant="ghost"
                    className="font-bold hover:text-blue-500 hover:bg-white"
                    onClick={async () => await loginWithRedirect()}
                >
                    Log In
                </Button>
            }
        </span>

    )
}

export default MainNav;