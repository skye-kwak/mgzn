import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, type, inline, _onClick } = props;
  const styles = {
    bold: bold, 
    color: color, 
    size: size, 
    margin: margin,
    type: type,
    inline: inline,
  };

  if (type === "logo") {
    return(
    <Logo {...styles} onClick={_onClick}>
		  {children}
	  </Logo>
    )
  }

  if (type === "heading") {
    return(
    <Heading {...styles}>
		  {children}
	  </Heading>
    )
  }

  return (
	  <P {...styles}>
		  {children}
	  </P>
  )
};
// #222831
Text.defaultProps = {
  children: null,
  bold: false,
  color: "#383D38",
  size: "10px",
  margin: false,
  inline: false,
  type: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "700" : "400")};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')};
  ${(props) => (props.font? `font-family: ${props.font};` : '')};
  ${(props) => (props.inline? `display: ${props.inline};` : '')};
`;

const Logo = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "900" : "400")}; 
  ${(props) => (props.margin? `margin: ${props.margin};` : '')};
  font-family: "Montserrat";
  cursor: pointer;
  &:hover {
		-webkit-text-stroke-width: 1px;
	  -webkit-text-stroke-color: #383D38;
    color: #E5E5E5;
  }
`;
const Heading = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "700" : "400")}; 
  ${(props) => (props.margin? `margin: ${props.margin};` : '')};
  font-family: "Montserrat";
  cursor: default;
`;


export default Text;