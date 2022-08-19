
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Login from "./pages/Login";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";

const App = observer( () => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, []);

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
});

export default App;
