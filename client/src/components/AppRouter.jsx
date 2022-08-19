import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {Context} from "../index";
// import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component} />
            )}

            {publicRoutes.map(({path, component}) =>
                <Route key={path}  path={path} element={component} />
            )}

            <Route path="*" element={user.isAuth ? <Dashboard/> : <Login/>}/>
        </Routes>

    );
};

export default AppRouter;