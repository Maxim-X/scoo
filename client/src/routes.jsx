import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {ALL_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import All from "./pages/All";

export const authRoutes = {
    visHeader : [
        {path: DASHBOARD_ROUTE, component: <Dashboard/>},
        {path: "*", component: <Dashboard/>}
    ],
    hidHeader : [
        // {path: DASHBOARD_ROUTE, component: <Dashboard/>}
    ]

};

export const publicRoutes = {
    visHeader : [

    ],
    hidHeader : [
        {path: LOGIN_ROUTE, component: <Login/>},
        {path: ALL_ROUTE, component: <All/>},
        {path: "*", component: <Login/>}
    ],
};