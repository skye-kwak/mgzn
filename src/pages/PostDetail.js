import React from "react";
import { Post } from "../components"
// import { CommentList, CommentWrite } from "../components"
// redux
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
	const dispatch =useDispatch();
	//path; id값을 props에서 가져오기
	const id = props.match.params.id;
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
	// id값으로 일치하는 포스트의 인덱스 찾아서 포스트 가져옴 
  const post_index = post_list.findIndex((post) => post.id === id);
  const post = post_list[post_index];

	React.useEffect(() => {
    if (!post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

	return (
		<React.Fragment>
			{post && (
        <Post {...post} is_myPost={post.user_info.user_id === user_info?.uid} />
      )}
		</React.Fragment>
	)
}

export default PostDetail;