import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Table} from "react-bootstrap";
import MainButton from "./UI/MainButton/MainButton";
import {AiFillEdit, AiFillDelete, AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import ModalClient from "./UI/ModalClient/ModalClient";
import RedButton from "./UI/RedButton/RedButton";
import {useNavigate} from "react-router-dom";
import {get_phone_client} from "../http/companyAPI";
import {Context} from "../index";

const TableMain = ({data_head, data_body, delete_item, data_search, url_edit, itemSearch}) => {
    const [selectedSort, setSelectedSort] = useState("");
    const [posts, setPosts] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [search, setSearch] = useState("");
    const {user} = useContext(Context);

    const navigate = useNavigate();

    useEffect(()=>{
         setPosts(data_body);
    }, [data_body]);
    useEffect(()=>{
        setSearch(data_search);
    }, [data_search]);


    const sortedAndSearch = useMemo(()=> {
        if (search == ""){
            setPosts(data_body);
        }else{
            let sortFullData = [];
            itemSearch.forEach(function (item){
                let sortItemData = data_body.filter(post => post[item].toLowerCase().includes(search.toLowerCase()));
                sortFullData = [...sortFullData, ...sortItemData];
            });
            sortFullData = sortFullData.reduce((r, i) =>
                !r.some(j => JSON.stringify(i) === JSON.stringify(j)) ? [...r, i] : r
            , [])
            setPosts(sortFullData);
        }
        setSelectedSort("");
        setReverse(false);
    }, [search]);

    const sortPost = useMemo(()=>{
        if (selectedSort != "") {
            let newSortPosts = [...posts].sort(function (a, b) {
                if (a[selectedSort] == null) {
                    return +1;
                } else if (b[selectedSort] == null) {
                    return -1;
                }
                return a[selectedSort].localeCompare(b[selectedSort]);
                ;
            });
            if (reverse) {
                newSortPosts.reverse();
            }
            setPosts(newSortPosts);
        }
    }, [selectedSort, reverse]);

    const sort = (new_sort) =>{
        if(new_sort == selectedSort) {
            setReverse(!reverse);
        }else{
            setReverse(false);
        }
        setSelectedSort(new_sort);
    }

    const checkSort = (elem) =>{
        if(elem == selectedSort){
            return reverse ? <AiOutlineArrowUp/>:<AiOutlineArrowDown/>;
        }
    }


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {data_head.map((d) =>
                        <th key={d['name']} onClick={e => sort(d['el'])}>
                            {d['name']}
                            {checkSort(d['el'])}
                        </th>
                    )}
                    <th>FUNC</th>
                </tr>
            </thead>
            <tbody>

            {posts.map((data) =>
                <tr key={data.id}>
                    {data_head.map((d) =>
                        <td key={data[d['el']]}>{data[d['el']]}</td>
                    )}
                <td key={"td-func-"+data['id']} width="min-content">
                    <MainButton key={"func-"+data['id']} style={{marginRight:"10px"}} onClick={e=>{navigate(`/${url_edit}/${data['id']}`);}}><AiFillEdit size="1.2rem" style={{marginRight:"0px"}}/></MainButton>
                    <RedButton key={"func-del-"+data['id']} onClick={e=>{delete_item(data['id'])}}><AiFillDelete size="1.2rem" style={{marginRight:"0px"}}/></RedButton>
                </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default TableMain;