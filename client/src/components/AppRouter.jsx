import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
// import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
    const isAuth = false;
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component} />
            )}

            {publicRoutes.map(({path, component}) =>
                <Route key={path}  path={path} element={component} />
            )}

            <Route path="*" element={isAuth ? <Login/> : <Dashboard/>}/>
        </Routes>

    );
};

export default AppRouter;