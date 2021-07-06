import React from "react";
import { PostA } from "../component/IndexOfComponents"
import { Button } from "../element/IndexOfElements"
import { history } from "../redux/configStore";

const PostList = (props) => {
	return (
		<React.Fragment>
			<PostA />
			<Button 
				is_float
				text="+"
				_onClick={() => {history.push("/write")}} />
		</React.Fragment>
	)
}

export default PostList;