import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
	return (
		<React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" size="40px"/>
            <Text bold size="0.9rem">{props.user_info.user_name}</Text>
						<Text size="0.9rem" margin="0px 0px 0px 10px">{props.user_info.user_email}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text size="0.9rem">{props.insert_dt}</Text>
  
          </Grid>
        </Grid>
        <Grid>
          <Image shape="square" src={props.image_url}/>
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" bold size="0.9rem">
           {props.likes_count} Likes
          </Text>
        </Grid>
				<Grid padding="0px 16px 32px">
          <Text bold size="0.9rem">{props.user_info.user_name}</Text>
					<Text size="0.9rem">{props.contents}</Text>
        </Grid>
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
};

export default Post;