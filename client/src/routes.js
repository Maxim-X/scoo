import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        component: <Dashboard/>,
    }
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>
    }
];