import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { LikeButton } from "../components"
// store; history
import { history } from "../redux/configStore";
// redux
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<Grid padding="16px 0px">
				<Grid is_flex padding="16px">
					<Grid is_flex width="auto">
						{/* user info */}
						<Image shape="circle" size="40px"/>
						<Text bold size="0.9rem" margin="0px 12px">{props.user_info.user_name}</Text>
						<Text size="0.9rem">{props.user_info.user_email}</Text>	
					</Grid>			

						{/* insert d/t */}
					<Grid is_flex width="auto">
						{/* edit/delete button */}
					<Grid is_flex width="auto">
						{props.is_myPost && (
							<React.Fragment>
								<Button
									width="auto"
									margin="4px"
									padding="4px"
									type="smallBtn"
									text="EDIT"
									_onClick={(e) => {
										// 이벤트캡처링/이벤트버블링 막기
										e.preventDefault();
										e.stopPropagation();
										// 게시글 수정하기
										history.push(`/write/${props.id}`);
									}} />
								<Button
									width="auto"
									margin="4px 8px 4px 4px"
									padding="4px"
									type="smallBtn"
									text="DELETE"
									_onClick={(e) => {
										// 이벤트캡처링/이벤트버블링 막기
										e.preventDefault();
										e.stopPropagation();
										// 게시글 삭제하기
										dispatch(postActions.deletePostFB(props.id));
									}} />
								</React.Fragment>								
							)}
						</Grid>					
						<Text size="0.9rem">{props.insert_dt}</Text>
					</Grid>									
				</Grid>

				{/* layout type이 a일 때 ••• */}
        {props.layout_type === "a" && (
          <React.Fragment>
						<Grid padding="0px 16px">
							<Text size="0.9rem">{props.contents}</Text>
						</Grid>
						<Grid is_flex padding="0px 16px 16px">
							<Grid is_flex>
								<Text margin="0px" bold size="0.9rem" >
									{props.likes_count} Likes 
								</Text>
								<LikeButton
									_onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										dispatch(postActions.toggleLikeFB(props.id));}}
									is_liked={props.is_liked}
									/>
							</Grid>
						</Grid>
						<Grid>
							<Image shape="square" src={props.image_url} />
						</Grid>						
          </React.Fragment>
        )}

        {/* layout type이 b일 때  ••• */}
        {props.layout_type === "b" && (
          <React.Fragment>
            <Grid is_flex alignType="default">
              <Grid width="50%" padding="4px 16px">
								<Grid is_flex>
									<Text margin="0px" bold size="0.9rem" >
										{props.likes_count} Likes
									</Text>
									<LikeButton
										_onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											dispatch(postActions.toggleLikeFB(props.id));}}
										is_liked={props.is_liked}
										/>
									</Grid>
                <Text size="0.9rem">{props.contents}</Text>
              </Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </React.Fragment>
        )}

        {/* layout type이 c일 때  ••• */}
        {props.layout_type === "c" && (
          <React.Fragment>
            <Grid is_flex alignType="default">
              <Image shape="rectangle" src={props.image_url} />
              <Grid width="50%" padding="4px 16px">
								<Grid is_flex>
									<Text margin="0px" bold size="0.9rem" >
										{props.likes_count} Likes
									</Text>
									<LikeButton
										_onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											dispatch(postActions.toggleLikeFB(props.id));}}
										is_liked={props.is_liked}
										/>
									</Grid>
                <Text size="0.9rem">{props.contents}</Text>
              </Grid>
            </Grid>
          </React.Fragment>
        )}	
			</Grid>
		</React.Fragment>
	)
}

Post.defaultProps = {
	id: null,
	user_info: {
		user_id: "",
		user_email: "",
		user_name: "",
		user_profile: "",
	},
	image_url: "",
	contents: "",
	likes_count: 0,
	layout_type: "a",
	insert_dt: "2021-07-01 00:00:00",
	is_myPost: false,
	is_liked: false,
};

export default Post;