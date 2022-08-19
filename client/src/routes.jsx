import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {ALL_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import All from "./pages/All";

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
    },
    {
        path: ALL_ROUTE,
        component: <All/>
    }
];