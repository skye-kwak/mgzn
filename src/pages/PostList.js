import React from "react";
import { PostA } from "../components"
import { Button } from "../elements"
import { history } from "../redux/configStore";
import Permit from "../shared/Permit"

const PostList = (props) => {
	return (
		<React.Fragment>
			<PostA />
			<Permit>
				<Button 
					is_float
					text="+"
					_onClick={() => {history.push("/write")}} />
			</Permit>
		</React.Fragment>
	)
}

export default PostList;