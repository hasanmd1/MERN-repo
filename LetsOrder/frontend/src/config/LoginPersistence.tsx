import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginPersistence = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loginInfoString = localStorage.getItem("loginInfo");
        if (!loginInfoString) {
            navigate("/");
            return;
        }

        const loginInfo = JSON.parse(loginInfoString);
        const { isAuthenticated, expiry } = loginInfo;

        if (!isAuthenticated || expiry < Date.now()) {
            navigate("/");
        }
    }, [navigate]);

    return;
};

export default useLoginPersistence;
