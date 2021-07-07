import React from "react";
import styled from "styled-components";

import { Text, Grid } from ".";

const Input = (props) => {
	const { 
		label, 
		placeholder, 
		_onChange, 
		type, 
		multiline, 
		name, 
		id, 
		value,
		is_enterPressed,
    onSubmit, 
	} = props;

	if (type ==="radio"){
		return (
			<Grid>
				<ElementRadio/>
			</Grid>
		);
	}

	if (multiline){
		return (
			<Grid>
				{label && <Text margin="0px">{label}</Text>}
				<ElementTextarea
					rows={6}
					value={value}
          placeholder={placeholder}
          onChange={_onChange}
					name={name}
					id={id}
				></ElementTextarea>
			</Grid>
		);
	}
	
	return (
		<React.Fragment>
			<Grid>
				{label && <Text margin="0px">{label}</Text>}
				<ElementInput
					type={type} placeholder={placeholder} onChange={_onChange} name={name}
					id={id} />
			</Grid>
		</React.Fragment>
	);
};

Input.defaultProps = {
	multiline: false,
	label: "",
	placeholder: "",
	type: "text",
	value: "",
	_onChange: () => {},
	name: null,
	id: null,
	is_enterPressed: false,
  onSubmit: () => {},
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
