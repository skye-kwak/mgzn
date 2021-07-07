import React from "react";
import styled from "styled-components";

const Button = (props) => {
	const { text, _onClick, is_float, children, margin, width, padding, type, disabled } = props;
	const styles = {
		margin: margin,
		width: width,
		padding: padding,
		type: type,
		disabled: disabled,
	};

	if ( is_float ) {
		return (
			<React.Fragment>
				<FloatButton {...styles} onClick={_onClick}>{text? text : children}</FloatButton>
			</React.Fragment>
		);
	}

	if ( type === "menu" ) {
		return (
			<React.Fragment>
				<MenuButton {...styles} onClick={_onClick}>{text? text : children}</MenuButton>
			</React.Fragment>
		);
	}

	if ( type === "smallBtn") {
		return (
			<React.Fragment>
				<PostSmallButton {...styles} onClick={_onClick}>{text? text : children}</PostSmallButton>
			</React.Fragment>
		)
	}
	
	return (
		<React.Fragment>
			<DefaultButton {...styles} onClick={_onClick}>{text? text: children}</DefaultButton>
		</React.Fragment>
	);
};

Button.defaultProps = {
	text: false,
	children: null,
	_onClick: () => {},
	is_float: false,
	margin: false,
	width: "100%",
	padding: "12px 0px",
	fontFamily: "Montserrat",
	cursor: "pointer",
	disabled: false,
	borderRadius: "1px",
};


//-- default & disabpled default --//
const DefaultButton = styled.button`
	width: ${(props) => props.width};
	background-color: #383D38;
	color: #E5E5E5;
	padding: ${(props) => props.padding};
	box-sizing: border-box;
	border: none;
	border-radius: 2px;
	font-family: "Montserrat";
	font-weight: 700;
	font-size: 1.0rem;
	${(props) => (props.margin ? `margin: ${props.margin};` : "")}
	cursor: pointer;
		&:disabled {
  		background-color: #c0c0c0;
		}
`;

//-- header menu --//
const MenuButton = styled.button`
	width: ${(props) => props.width};
	background-color: #E5E5E5;
	color: #383D38;
	padding: ${(props) => props.padding};
	box-sizing: border-box;
	border: none;
	font-family: "Montserrat";
	font-weight: 400;
	font-size: 1.2rem;
	${(props) => (props.margin ? `margin: ${props.margin};` : "")}
	cursor: pointer;
		&:hover {
			font-weight: 700;
		}
	
`;

//-- post update & delete button --//
const PostSmallButton = styled.button`
	width: ${(props) => props.width};
	background-color: #E5E5E5;
	color: #383D38;
	padding: ${(props) => props.padding};
	box-sizing: border-box;
	border: 1px solid #E5E5E5;
	font-family: "Roboto";
	font-weight: 700;
	font-size: 0.7rem;
	cursor: pointer;
	border-radius: 1px;
	${(props) => (props.margin ? `margin: ${props.margin};` : "")}
	&:hover {
			border: 1px solid #383D38;
			color: #E5E5E5;
			background-color: #383D38;
		}
`;

//-- fixed float button --//
const FloatButton = styled.button`
	width: 60px;
	height: 60px;
	border-radius: 60px;
	background-color: #383D38;
	color: #E5E5E5;
	box-sizing: border-box;
	font-size: 3.0rem;
	font-weight: 800;
	position: fixed;
	bottom: 20px;
	right: 20px;
	text-align: center;
	vertical-align: middle;
	border: none;
	cursor: pointer;
		&:hover {
			-webkit-text-stroke-width: 1px;
	  	-webkit-text-stroke-color: #383D38;
    	color: #E5E5E5;
			border: 1px solid #383D38;
			background-color: #E5E5E5;
		}
`;

export default Button;
