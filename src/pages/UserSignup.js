import React from "react";
import { Grid, Text, Input, Button } from "../elements";
// redux
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { checkEmailValidity } from "../shared/checkValid";

const UserSignup = (props) => {
	const dispatch = useDispatch();

	const [user_email, setUserEmail] = React.useState("");
	const [user_name, setUserName] = React.useState("");
	const [user_password, setUserPassword] = React.useState("");
	const [user_confirmPassword, setUserConfirmPassword] = React.useState("");

	// signup function for submit button
	const signup = () => {
		// middleware 보내기 전 기본적인 것들 확인하기 
		// check input validity 
		if (user_email === "" || user_name === "" || user_password === "" || user_confirmPassword === "" ) {
			window.alert("이메일, 닉네임, 비밀번호를 모두 입력하세요.");
			return;
		}
		if (!checkEmailValidity(user_email)) {
			window.alert("입력하신 이메일이 형식에 맞지 않습니다.");
			return;
		}
		if (user_password !== user_confirmPassword) {
			window.alert("비밀번호가 일치하지 않습니다.");
			return;
		}
		
		dispatch(userActions.signupFB(user_email, user_password, user_name));
	};

	return (
		<React.Fragment>
			<Grid padding="16px">
				<Grid>
					<Text type="heading" bold size="2.0rem">
						SIGN•UP
					</Text>
				</Grid>
				<form>
				<Grid padding="16px 0px">
					<Input
						label="Email"
						type="email"
						placeholder="이메일 주소를 입력하세요."
						_onChange={(e) => {
							setUserEmail(e.target.value);
						}}
					/>
				</Grid>
				<Grid padding="16px 0px">
					<Input
						label="Name"
						type="text"
						placeholder="닉네임을 입력하세요."
						_onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
				</Grid>
				<Grid padding="16px 0px">
					<Input
						label="Password"
						type="password"
						placeholder="비밀번호를 입력하세요."
						_onChange={(e) => {
							setUserPassword(e.target.value);
						}}
					/>
				</Grid>
				<Grid padding="16px 0px">
					<Input
						label="Confirm Password"
						type="password"
						placeholder="비밀번호를 다시 입력하세요."
						_onChange={(e) => {
							setUserConfirmPassword(e.target.value);
						}}
					/>
				</Grid>
				</form>
				<Button 
					margin="20px 0px" 
					text="SIGN UP" 
					_onClick={signup}
				/>
			</Grid>
		</React.Fragment>
	)
}

export default UserSignup;