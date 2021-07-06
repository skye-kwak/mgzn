import React from "react";
import { Grid, Text, Input, Button } from "../element/IndexOfElements";

const UserSignup = (props) => {
	return (
		<React.Fragment>
			<Grid padding="16px">
        <Grid>
          <Text type="heading" bold size="2.0rem">
            SIGN•UP
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
            label="Name"
            type="text"
            placeholder="닉네임을 입력하세요."
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="Password"
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="Confirm Password"
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
          />
        </Grid>
        <Button margin="20px 0px" text="SIGN UP" ></Button>
      </Grid>
		</React.Fragment>
	)
}

export default UserSignup;