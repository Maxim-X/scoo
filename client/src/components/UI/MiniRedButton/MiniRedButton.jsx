import React from 'react';
import {Button} from "react-bootstrap";
import classes from "./MiniRedButton.module.css"
const MiniRedButton = ({children, ...props}) => {
    return (
        <Button {...props} className={classes.redBut}>{children}</Button>
    );
};

export default MiniRedButton;