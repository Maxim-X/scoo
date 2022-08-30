import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Login from "./pages/Login";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check, getRole} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer( () => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [roleAccess, setRoleAccess] = useState({});

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
});

export default App;
