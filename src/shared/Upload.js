import React from "react";
import { Grid, Text, Button, Input } from "../elements"
import styled from "styled-components";
// firebase storage
import { storage } from "./firebase";
// redux
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";


const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => (state.image.uploading))
  //ref; file 
  const fileInput = React.useRef();
  const selectedFile = (e) => {
    //file obj 확인하기
    // console.log(e.target.files[0]);
    // console.log(fileInput.current.files[0]);

    // FileReader 사용하기
    const reader = new FileReader();
    const file = fileInput.current.files[0]; //=== e.target.files[0]
    // 파일을 읽고
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        // console.log(reader.result);
        dispatch(imageActions.setPreview(reader.result));
    }
  }

  // const uploadFB = () => {
  //   let image = fileInput.current.files[0];
  //   if (!fileInput.current || fileInput.current.files.length === 0) {
  //     window.alert("파일을 선택해주세요.");
  //     return;
  //   }
  //   dispatch(imageActions.uploadImageFB(image));
  // }
  

  return (
    <React.Fragment>
      <label htmlFor="fileUpload" />
      <input type="file" name="fileUpload"
         ref={fileInput} onChange={selectedFile}
         disabled={uploading}/> 
    </React.Fragment>
  )
}

export default Upload;

// const LabelButton = styled.label`
//   display: inline-block;
//   padding: 10px 20px;
//   color: #999;
//   vertical-align: middle;
//   background-color: #fdfdfd;
//   cursor: pointer;
//   border: 1px solid #ebebeb;
//   border-radius: 5px;
// `;