import React from 'react';
import {Button} from "react-bootstrap";
import classes from "./RedButton.module.css"
const RedButton = ({children, ...props}) => {
    return (
        <Button {...props} className={classes.redBut}>{children}</Button>
    );
};

export default RedButton;