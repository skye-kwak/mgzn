import React from "react";
import { Grid, Text, Input, Button } from "../element/IndexOfElements";

const UserLogin = (props) => {
	return (
		<React.Fragment>
			<Grid padding="16px">
        <Grid>
          <Text type="heading" bold size="2.0rem">
            LOG•IN
          </Text>
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="Email"
            type="email"
            placeholder="이메일 주소를 입력하세요."
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="Password"
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </Grid>
        <Button margin="20px 0px" text="LOG IN"></Button>
      </Grid>
		</React.Fragment>
	)
}

export default UserLogin;