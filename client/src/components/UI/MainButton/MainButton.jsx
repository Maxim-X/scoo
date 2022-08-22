import React from 'react';
import {Button} from "react-bootstrap";
import classes from "./MainButton.module.css"
const MainButton = ({children, ...props}) => {
    return (
        <Button {...props} className={classes.mainBut}>{children}</Button>
    );
};

export default MainButton;