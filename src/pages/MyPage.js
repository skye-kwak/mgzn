import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image, Button } from "../elements";
//-- redux --//
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"
//-- user auth --//
import { apiKey } from "../shared/firebase";

const MyPage = (props) => {
  // const dispatch = useDispatch();
  // const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // const is_session = sessionStorage.getItem(_session_key) ? true : false;
 
  React.useEffect(() => {
    
  }, []);
  
	return (
		<React.Fragment>
			<Grid padding="16px" center>
        <Text type="heading" bold size="2.0rem">
          Good day, user_name !
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