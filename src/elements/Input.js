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
		is_submit,
    onSubmit, 
	} = props;

	// if (type ==="radio"){
	// 	return (
	// 		<Grid>
	// 			<input/>
	// 		</Grid>
	// 	);
	// }

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
				{is_submit ? (
					<ElementInput
						type={type} 
						placeholder={placeholder} 
						onChange={_onChange}
						value={value} 
						name={name}
						id={id} 
						// value={value}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								onSubmit(e);
							}
						}}
					/>
				) : (
					<ElementInput
						type={type} 
						placeholder={placeholder} 
						onChange={_onChange} 
						name={name}
						id={id} 
						/>
				)}
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
	is_submit: false,
	_onChange: () => {},
	onSubmit: () => {},
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

// const ElementRadio = styled.input`
// `;

export default Input;
