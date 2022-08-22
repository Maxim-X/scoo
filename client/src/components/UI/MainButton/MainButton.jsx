import React from 'react';
import {IoIosAdd} from "react-icons/io";
import {Button} from "react-bootstrap";
import classes from "./MainButton.module.css"
const MainButton = ({children, ...props}) => {
    return (
        <Button {...props} className={classes.mainBut}>{children}</Button>
    );
};

export default MainButton;