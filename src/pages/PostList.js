import React from "react";
import { Post } from "../components"
import { Button, Grid } from "../elements"
import Permit from "../shared/Permit"
// redux
import { history } from "../redux/configStore";
import { useSelector } from "react-redux";

const PostList = (props) => {
	const post_list = useSelector((state) => state.post.list)

	return (
		<React.Fragment>
			<Grid bg_color={"#EFF6FF"} padding="20px 0px">
				{post_list.map((post, index) => {
					return (
						<Grid
							bg="#ffffff"
							margin="8px 0px"
							key={post.id}>
							<Post {...post}/>
						</Grid>
					);})}	
				<Permit>
					<Button 
						is_float
						text="+"
						_onClick={() => {history.push("/write")}} />
				</Permit>
			</Grid>
		</React.Fragment>
	)
}

export default PostList;