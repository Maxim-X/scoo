import React, {useEffect, useMemo, useState} from 'react';
import {Table} from "react-bootstrap";
import MainButton from "./UI/MainButton/MainButton";
import {AiFillEdit, AiFillDelete, AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import ModalClient from "./UI/ModalClient/ModalClient";
import RedButton from "./UI/RedButton/RedButton";

const TableMain = ({data_head, data_body, setClientEdit, setModalShow, deleteClient, data_search}) => {
    const [selectedSort, setSelectedSort] = useState("");
    const [posts, setPosts] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [search, setSearch] = useState("");

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
            setPosts(data_body.filter(post => post.name.toLowerCase().includes(search.toLowerCase())));
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
    // useEffect(()=>{
    //     if (data_search === ""){
    //         setPosts(data_body);
    //     }else{
    //         setSearch(data_search);
    //         searchSort(data_search);
    //     }
    // }, [data_search]);

    // const searchSort = (search) => {
    //     let matches = [], i, key;
    //     posts.map((post) => {
    //         for( key in post ){
    //             if( post.hasOwnProperty(key) && key.indexOf(search) > -1 )
    //                 matches.push( post ); break;
    //         }
    //     });
    //
    //     setPosts(matches);
    // }

    const checkSort = (elem) =>{
        if(elem == selectedSort){
            return reverse ? <AiOutlineArrowUp/>:<AiOutlineArrowDown/>;
        }
    }

    // const sortPost = (sort) => {
    //     let reverse_g = reverse;
    //     reverse_g = (sort == selectedSort && !reverse_g) ? true : false;
    //     setSelectedSort(sort);
    //     let newSortPosts = [...posts].sort(function (a,b){
    //         if (a[sort] == null ){
    //             return +1;
    //         }else if (b[sort] == null){
    //             return -1;
    //         }
    //         return a[sort].localeCompare(b[sort]);;
    //     });
    //     if (reverse_g){
    //         newSortPosts.reverse();
    //     }
    //     setReverse(reverse_g);
    //     setPosts(newSortPosts);
    // }
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
                    <MainButton key={"func-"+data['id']} style={{marginRight:"10px"}} onClick={e=>{setClientEdit(data['id']); setModalShow(true)}}><AiFillEdit size="1.2rem" style={{marginRight:"0px"}}/></MainButton>
                    <RedButton key={"func-del-"+data['id']} onClick={e=>{deleteClient(data['id'])}}><AiFillDelete size="1.2rem" style={{marginRight:"0px"}}/></RedButton>
                </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default TableMain;