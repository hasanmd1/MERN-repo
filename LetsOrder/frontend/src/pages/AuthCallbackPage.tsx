import {useAuth0} from "@auth0/auth0-react";
import {useCreateMyUser} from "@/api/MyUserApi.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth0();
    const {createUser} = useCreateMyUser();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        const handleCreateUser = async () => {
            if (user?.sub && user?.email && !hasCreatedUser.current) {
                createUser({auth0Id: user.sub, email: user.email});
                hasCreatedUser.current = true;
            }
        }

        const handleLoginPersistence = () => {
            // Set login info in browser storage with an expiry period
            const loginInfo = {
                isAuthenticated: true,
                expiry: Date.now() + 3600 * 1000 // 1 hour expiry
            };
            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        };

        handleCreateUser();
        handleLoginPersistence();
        navigate('/')
    },[createUser, isAuthenticated, navigate, user]);
    return <>Loading...</>

};

export default AuthCallbackPage;