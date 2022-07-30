import {
    Navigate,
} from "react-router-dom";

export const SignInWrapper = ({ children, currentAccount, adminAddress }) => {
    console.log(currentAccount == adminAddress)
    return currentAccount == adminAddress ? children: <Navigate to="/" replace /> ;
};
