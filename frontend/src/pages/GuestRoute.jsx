import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// Blocks logged-in users from reaching guest-only pages (login / register
// "onboarding"). While a session is valid they are bounced to the dashboard;
// they must log out (which clears the token) to return here.
const GuestRoute = ({ children }) => {
    if (isAuthenticated())
        return <Navigate to={'/dashboard'} replace />;

    return children;
}

export default GuestRoute;
