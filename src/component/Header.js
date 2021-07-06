import React from "react";
import { Grid, Text, Button } from "../element/IndexOfElements";
import { history } from "../redux/configStore";

const Header = (props) => {
	
	return (
    <React.Fragment>
      <Grid is_flex padding="10px 16px 50px 16px">
        <Grid>
          <Text 
            type="logo" 
            margin="0px" 
            size="36px" bold
            _onClick={() => {history.push("/")}}>
            MGZN
          </Text>
        </Grid>

        <Grid is_flex>
          <Button					
						type="menu"
            text="LOG IN"
            _onClick={() => {history.push("/login");}}
          ></Button>
          <Button				
						type="menu"
            text="SIGN UP"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
	)
}

export default Header;