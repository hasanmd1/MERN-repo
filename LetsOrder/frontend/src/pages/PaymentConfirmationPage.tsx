import { useNavigate} from "react-router-dom";
import {useEffect} from "react";



const PaymentConfirmationPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const returnUrl = sessionStorage.getItem('checkoutReturnUrl');
        sessionStorage.removeItem('checkoutReturnUrl');
        if (returnUrl) {
            navigate(returnUrl);
        }else {
            navigate('/');
        }
    }, [navigate]);
    return (
        <div>
            <h1>Payment Confirmation Page </h1>
        </div>
    )
}

export default PaymentConfirmationPage;