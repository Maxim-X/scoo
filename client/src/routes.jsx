import Login from "./pages/Login";
import {ALL_ROUTE, CLIENTS_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, STOCK_ROUTE} from "./utils/consts";
import All from "./pages/All";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Clients from "./pages/Clients";


export const authRoutes = {
    visHeader : [
        {path: DASHBOARD_ROUTE, component: <Dashboard/>},
        {path: STOCK_ROUTE, component: <Stock/>},
        {path: CLIENTS_ROUTE, component: <Clients/>},
        {path: "*", component: <Dashboard/>},
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