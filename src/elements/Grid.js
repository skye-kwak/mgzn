import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg_color, children, center, _onClick, is_myPost } = props;

  const styles = {
      is_flex: is_flex,
      width: width,
      margin: margin,
      padding: padding,
      bg_color: bg_color,
      center: center,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg_color: false,
  center: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg_color ? `background-color: ${props.bg_color};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) => props.center? `text-align: center;`: ""}
`;

export default Grid;
