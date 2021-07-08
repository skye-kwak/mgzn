import styled from 'styled-components';
import React from "react";

const Image = (props) => {
	const {shape, src, size, } = props;

	const styles = {
		src: src,
		size: size,
	}

	if(shape === "circle"){
		return (
			<ImageCircle {...styles}></ImageCircle>
		)
	}

	if(shape === "square"){
		return (
			<AspectOutter>
				<AspectInner {...styles}></AspectInner>
			</AspectOutter>
		)
	}
	if(shape === "rectangle"){
		return (
			<AspectOutter>
				<AspectInnerRect {...styles}></AspectInnerRect>
			</AspectOutter>
		)
	}

	return (
		<React.Fragment>
			<ImageDefault {...styles}></ImageDefault>
		</React.Fragment>
	)
}

Image.defaultProps = {
  shape: "circle",
  src: "https://firebasestorage.googleapis.com/v0/b/react-assignment-27df2.appspot.com/o/images%2Fyana_hurskaya-HpQFPnCK7_A-unsplash.jpg?alt=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6",
  size: 40,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
	width: 100%;
	min-width: 250px;
`;

const AspectInner = styled.div`
	position: relative;
	padding-top: 100%;
	overflow: hidden;
	background-image: url("${(props) => props.src}");
	background-size: cover;
`;

const AspectInnerRect = styled.div`
	position: relative;
	padding-top: 150%;
	overflow: hidden;
	background-image: url("${(props) => props.src}");
	background-size: cover;
`;


const ImageCircle = styled.div`
	display: inline-block;
	--size: ${(props) => props.size};
	width: var(--size);
	height: var(--size);
	border-radius: var(--size);
	background-image: url("${(props) => props.src}");
	background-size: cover;
`;

export default Image;