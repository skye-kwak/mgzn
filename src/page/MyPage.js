import React from "react";
import { Grid, Text, Image, Button } from "../element/IndexOfElements";

const MyPage = (props) => {
	return (
		<React.Fragment>
			<Grid padding="16px" center>
        <Text type="heading" bold size="2.0rem">
          Good day, Sam!
        </Text>
        <Grid>
          <Image shape="circle" size="75vw"/>
        </Grid>
        <Text type="heading" size="1.5rem">
          goodday@gmail.com
        </Text>  
        <Button margin="20px 0px" text="CHANGE PROFILE PHOTO"></Button>
      </Grid>
		</React.Fragment>
	)
}

export default MyPage;