import React, {useContext} from 'react';
import {Context} from "../index";

const All = () => {
    const {user} = useContext(Context);
    console.log(user);
    console.log(user);
    console.log(user.isAuth)
    return (
        <div>
            <h1>ddd</h1>
            <div>{user.isAuth ? <b>1</b> : <b>2</b> }</div>
        </div>
    );
};

export default All;