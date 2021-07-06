import React from "react";
import { Grid, Text, Button, Input } from "../elements"
import styled from "styled-components";

const Upload = (props) => {
  return (
    <React.Fragment>
      <label htmlFor="fileUpload" />
      <input type="file" name="fileUpload"/>
    </React.Fragment>
  )
}

export default Upload;

const LabelButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: #999;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-radius: 5px;
`;