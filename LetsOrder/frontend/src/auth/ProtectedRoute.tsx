import { useAuth0 } from "@auth0/auth0-react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";



const ProtectedRoute = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
                try {
                    await loginWithRedirect({
                        appState: { returnTo: location.pathname },
                    });
                }
                catch (err) {
                    console.log("Error");
                }
            }
        };

        if (!isAuthenticated && !isLoading) {
            checkAuth();
        }

    }, [isAuthenticated, isLoading, location.pathname, loginWithRedirect]);

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <Outlet/>
    }

    return <Navigate to="/" replace/>;
};

export default ProtectedRoute;