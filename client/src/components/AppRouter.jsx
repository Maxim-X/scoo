import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {Context} from "../index";
import Header from "./Header";
// import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user.isAuth);

    let routes_template, routes_not_template;
    if (user.isAuth){
        routes_template = authRoutes.visHeader;
        routes_not_template = authRoutes.hidHeader;
    }else{
        routes_template = publicRoutes.visHeader;
        routes_not_template = publicRoutes.hidHeader;
    }
    return (
        <Routes>
            /* Отрисовка страниц по шаблону */
            {routes_template.length > 0 &&
                <Route path="/" element={<Header/>}>
                    {routes_template.map(({path, component}) =>
                        <Route key={path} path={path} element={component} />
                    )}

                </Route>
            }

            /* Отрисовка страниц не по шаблону */
            {routes_not_template.length > 0 &&
                routes_not_template.map(({path, component}) =>
                    <Route key={path} path={path} element={component} />
                )
            }

            <Route path="*" element={user.isAuth ? <Dashboard/> : <Login/>}/>
        </Routes>

    );
};

export default AppRouter;