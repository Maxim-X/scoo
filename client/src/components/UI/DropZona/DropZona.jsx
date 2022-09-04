import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import classes from "./DropZona.module.css";
import {AiOutlineCloudUpload} from "react-icons/ai";

const DropZona = ({props, user, id, allFiles, saveUploadImages, setSaveUploadImages, update_files_info, uploadImageFunc, deleteItem}) => {
    const [uploadImage, setUploadImage] = useState([]);
    const [drag, setDrag] = useState(false);
    const [uploadServerImage, setUploadServerImage] = useState([]);


    useEffect(()=>{
        setUploadServerImage(allFiles);
    }, [allFiles]);

    const dragStartHandler = (e) =>{
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e) =>{
        e.preventDefault();
        setDrag(false);
    }

    function drop(e){
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        let files;

        if (e.dataTransfer != undefined){
            files = e.dataTransfer.files;
        }else{
            files = e.target.files;
        }

        if (id){
            const upload = uploadImageFunc(files, id);
            if (upload){
                update_files_info();
            }
        }else{
            setSaveUploadImages([...saveUploadImages, files]);
        }
        update_files_info();



    }

    const del_img = async (images_name) =>{
        if (id){
            try {
                const del = deleteItem(images_name);
            }catch (e){
                console.log(e.response.data.message);
            }
        }else{
            setSaveUploadImages([...saveUploadImages.filter(function(f) { console.log(f[0]['name'] !== images_name); return f[0]['name'] !== images_name  })]);
        }
        update_files_info();
    }
    return (
        <Row className={classes.dragAndDrop}>
            <Col md="4">
                {drag
                    ? <div className={classes.dragAndDropZonaActive} key="drag_and_drop_zona"
                           onDragEnter ={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}
                           onDrop={e => drop(e)}
                    ><AiOutlineCloudUpload/>Отпустите файл, что-бы загрузить <div><input type="file" onChange={e => {drop(e)}} accept="image/jpeg,image/png"/></div></div>
                    : <div className={classes.dragAndDropZona} key="drag_and_drop_zona"
                           onDragEnter ={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}
                           onDrop={e => drop(e)}
                    ><AiOutlineCloudUpload/>Перетащите файл, что-бы загрузить <div><input type="file" onChange={e => {drop(e)}} accept="image/jpeg,image/png"/></div></div>
                }
            </Col>
            <Col>
                <div className={classes.allFilesZona}>
                    {uploadServerImage && uploadServerImage.map((file)=>
                        <div className={classes.fileBlock} key={file.path}>
                            <img onClick={e => window.open(process.env.REACT_APP_API_URL +"/"+ file.path)} src={process.env.REACT_APP_API_URL +"/"+ file.path} />
                            <div onClick={e => del_img(file.path)} className={classes.butDelete}>Delete</div>
                        </div>
                    )}
                    {saveUploadImages && saveUploadImages.map((file)=>
                        <div className={classes.fileBlock} key={file[0]['name']}>
                                <div>{file[0]['name']}</div>
                                <div onClick={e => del_img(file[0]['name'])} className={classes.butDelete}>Delete</div>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default DropZona;