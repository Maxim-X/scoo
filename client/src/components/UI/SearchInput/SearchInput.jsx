import React from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import classes from "./SearchInput.module.css"
import {AiOutlineSearch} from "react-icons/ai";
const SearchInput = (props) => {
    return (
        <InputGroup className={classes.mainSearch}>
            <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch className={`d-inline-block align-center ${classes.iconSearch} `}/>
            </InputGroup.Text>
            <Form.Control
                placeholder={props.placeholder}
                aria-label={props.placeholder}
                aria-describedby="basic-addon2"
                value={props.value}
                onChange={props.onChange}
            />
        </InputGroup>
    );
};

export default SearchInput;