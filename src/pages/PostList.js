import React from "react";
// page, elements, shared component
import { Post } from "../components"
import { Grid } from "../elements"

// redux
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
	const dispatch = useDispatch();
	const post_list = useSelector((state) => state.post.list);
	const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

	React.useEffect(() => {
		if(post_list.length === 0){
			dispatch(postActions.getPostFB());
 		}
	}, []);

	return (
		<React.Fragment>
			<Grid padding="20px 0px">
				{post_list.map((post, index) => {
					return (
						<Grid 
							key={post.id}>
							<Post {...post}/>
						</Grid>
					);
				})}	
				
			</Grid>
		</React.Fragment>
	)
}

export default PostList;