import React from "react";
import { Grid, Text, Input, Button } from "../elements";
// redux
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { checkEmailValidity } from "../shared/checkValid";

const UserLogin = (props) => {
	const dispatch = useDispatch();
	const [user_email, setUserEmail] = React.useState("");
	const [user_password, setUserPassword] = React.useState("");

	const is_invalidInput = (user_email === "") || (user_password === "") ? true : false

	const login= () => {
		// middleware 보내기 전 기본적인 것들 확인하기 
		// check input validity 
		if (user_email === "" || user_password === "" ) {
			window.alert("이메일, 비밀번호를 모두 입력하세요.");
			return;
		}
		if (!checkEmailValidity(user_email)) {
			window.alert("입력하신 이메일이 형식에 맞지 않습니다.");
			return;
		}		
		dispatch(userActions.loginFB(user_email, user_password));
	}

	return (
		<React.Fragment>
			<Grid padding="16px">
				<Grid>
					<Text type="heading" bold size="2.0rem">
						LOG•IN
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
							label="Password"
							type="password"
							placeholder="비밀번호를 입력하세요."
							_onChange={(e) => {
								setUserPassword(e.target.value);
							}}
							value={user_password}
							is_submit
            	onSubmit={login}
						/>
					</Grid>
				</form>
				{is_invalidInput ? (
					<Button 
					margin="20px 0px" 
					text="LOG IN"
					_onClick={login}
					disabled /> 
				) : (
					<Button 
					margin="20px 0px" 
					text="LOG IN"
					_onClick={login}
					 /> 
				)}
					
			</Grid>
		</React.Fragment>
	)
}
// button 콜백함수 주의; 이미 엘리먼트 속성으로 잡아뒀기 때문에 함수명만 집어넣기
export default UserLogin;