import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const {logout} = useAuth0();
    return (
        <>
            <Link to="/order-status" className="flex items-center font-bold bg-white hover:text-blue-500">
                Order Status
            </Link>
            <Link to="/manage-restaurant" className="flex items-center font-bold bg-white hover:text-blue-500">
                Manage Restaurant
            </Link>
            <Link to="/user-profile" className="flex items-center font-bold bg-white hover:text-blue-500">
                User Profile
            </Link>
            <Button
                className="flex items-center font-bold px-3 hover:text-blue-500"
                onClick={async () => await logout()}
            >
                Log Out
            </Button>
        </>
    );
};

export default MobileNavLinks;