import React from "react";
import { Grid, Image, Text } from "../element/IndexOfElements";

const PostA = (props) => {
	return (
		<React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" size="40px"/>
            <Text bold size="0.9rem">user_name</Text>
						<Text size="0.9rem" margin="0px 0px 0px 10px">user_email</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text size="0.9rem">2021-07-03 00:00:00</Text>
  
          </Grid>
        </Grid>
        <Grid>
          <Image shape="square" />
        </Grid>
        <Grid padding="16px 0px 0px 16px">
          <Text margin="0px" bold size="0.9rem">
            10 Likes
          </Text>
        </Grid>
				<Grid padding="0px 16px">
          <Text bold size="0.9rem">user_name</Text>
					<Text size="0.9rem">post_contents</Text>
        </Grid>
      </Grid>
    </React.Fragment>
	)
}

export default PostA;