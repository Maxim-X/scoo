import React, {useEffect, useState} from 'react';
import {del_images, get_all_images, upload_images_client} from "../../../http/companyAPI";
import {Col, Row} from "react-bootstrap";
import classes from "./DropZona.module.css";
import {AiOutlineCloudUpload} from "react-icons/ai";

const DropZona = ({props, user, id, allFiles, saveUploadImages, setSaveUploadImages}) => {
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
        let files = e.dataTransfer.files;
        const FormData1 = new FormData();
        FormData1.append('images', files[0]);
        FormData1.append('id_company', user.user.company.id);
        FormData1.append('id_client', id);

        if (id){
            const upload = upload_images_client(FormData1);
        }else{
            setSaveUploadImages([...saveUploadImages, files]);
        }

        if (saveUploadImages.length != 0){
            for (let i = 0; i < saveUploadImages.length; i++){
                console.log(saveUploadImages[i][0]);
            }
        }


    }

    const del_img = async (images_name) =>{
        if (id){
            try {
                const del = await del_images(user.user.company.id, images_name);
                setUploadServerImage([...uploadServerImage.filter(function(f) { console.log(f[0]); return f[0]['name'] !== images_name  })]);
            }catch (e){
                console.log(e.response.data.message);
            }
        }else{
            setUploadImage([...saveUploadImages.filter(function(f) { console.log(f[0]); return f[0]['name'] !== images_name  })]);

        }
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
                    ><AiOutlineCloudUpload/>Отпустите файл, что-бы загрузить</div>
                    : <div className={classes.dragAndDropZona} key="drag_and_drop_zona"
                           onDragEnter ={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}
                           onDrop={e => drop(e)}
                    ><AiOutlineCloudUpload/>Перетащите файл, что-бы загрузить</div>
                }
            </Col>
            <Col>
                <div className={classes.allFilesZona}>
                    {uploadServerImage && uploadServerImage.map((file)=>
                        <div className={classes.fileBlock}>
                            <img onClick={e => window.open(process.env.REACT_APP_API_URL +"/"+ file.path)} src={process.env.REACT_APP_API_URL +"/"+ file.path} />
                            <div onClick={e => del_img(file.path)} className={classes.butDelete}>Delete</div>
                        </div>
                    )}
                    {saveUploadImages && saveUploadImages.map((file)=>
                        <div className={classes.fileBlock}>
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