import React from "react";
import styled from "styled-components";

import { Text, Grid } from "../element/IndexOfElements";

const Input = (props) => {
	const { label, placeholder, _onChange, type, multiline, name, id } = props;
	const styles = {
    label: label, 
    placeholder: placeholder, 
    onChange: _onChange, 
    type: type,
    multiline: multiline,
		name: name,
		id: id,
  };

	if (type ==="radio"){
		return (
			<Grid>
				<ElementRadio {...styles} />
			</Grid>
		);
	}


	if (multiline){
		return (
			<Grid>
				{label && <Text margin="0px">{label}</Text>}
				<ElementTextarea
					rows={6}
					{...styles}
				></ElementTextarea>
			</Grid>
		);
	}
	
	return (
		<React.Fragment>
			<Grid>
				{label && <Text margin="0px">{label}</Text>}
				<ElementInput {...styles} />
			</Grid>
		</React.Fragment>
	);
};

Input.defaultProps = {
	multiline: false,
	label: null,
	placeholder: "",
	type: "text",
	value: "",
	_onChange: () => {},
	name: null,
	id: null,
};

const ElementTextarea = styled.textarea`
	border: 1px solid #383D38;
	background-color: #E5E5E5;
	border-radius: 1px;
	width: 100%;
	padding: 12px 4px;
	box-sizing: border-box;
`;

const ElementInput = styled.input`
	border: 1px solid #383D38;
	background-color: #E5E5E5;
	border-radius: 1px;
	width: 100%;
	padding: 12px 4px;
	box-sizing: border-box;
`;

const ElementRadio = styled.input`

		
`;

export default Input;
