import React from "react";

const LayoutRadiobtn = (props) => {
	// const changeRadioQ1 = (e) => {
	// 	setQ1(e.target.value);
	// };
	
	// const changeRadioQ2 = (e) => {
	// 	setQ2(e.target.value);
	// };
	
	

	return (
		<React.Fragment>
			<form style={{ display: "flex", flexDirection: "column" }}>
				<label htmlFor="asdf">
					<input
						type="radio"
						id="asdf"
						name="asdf"
						value="asdf"


					></input>
					asdf
				</label>
				<label htmlFor="asdf">
					<input
						type="radio"
						id="asdf2"
						name="asdf2"
						value="asdf2"
	

					></input>
					asdf2
				</label>
			</form>
		</React.Fragment>
	)
}

export default LayoutRadiobtn;