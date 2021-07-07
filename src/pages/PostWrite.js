import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements"
import Upload from "../shared/Upload"
// redux
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
	const dispatch = useDispatch();
	// 로그인 여부 체크하기
  const is_loggedIn = useSelector((state) => state.user.is_loggedIn);
	const { history } = props;
	// useState ; setState(인풋 입력값)
	const [contents, setContents] = React.useState('');
	const changedContents = (e) => {setContents(e.target.value);};
	// useState; setState(레이아웃형식)
	const [layout_type, setLayoutType] = React.useState('');
  const changedLayoutType = (e) => {setLayoutType(e.target.value);};
	// 글 작성버튼과 리덕스 미들웨어 연동
	const createPost = () => {
		dispatch(postActions.createPostFB(contents));
	}

	if (!is_loggedIn) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗, 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요.</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

	return (
		<React.Fragment>
			<Grid padding="16px">
				<Text type="heading" bold size="2.0rem">SHARE•YOUR•MOMENTS</Text>
			</Grid>
			<Grid padding="16px">
				<Input 
					value={contents}
          _onChange={changedContents}
					placeholder="게시글 작성" 
					label="게시글 내용"
					multiline 
					type="text"/>
				<Upload />
				<Grid is_flex>
					<Input type="radio" name="layout" id="layout1"/><label htmlFor="layout1">layout1</label>
					<Input type="radio" name="layout" id="layout2"/><label htmlFor="layout2">layout2</label>
					<Input type="radio" name="layout" id="layout3"/><label htmlFor="layout3">layout3</label>
				</Grid>
			</Grid>
			{/* <Grid padding="16px">
        <Input
          type="text"
          value={layout_type}
          _onChange={changedLayoutType}
          label="레이아웃 타입"
          placeholder="a, b, c 중 하나를 골라주세요."
        />
      </Grid> */}
			
			<Grid>
			<Text type="heading" bold size="1.0rem">PREVIEW</Text>
				<Image shape="square"/>
			</Grid>
			<Grid padding="16px">	
				<Button 
					margin="20px 0px" 
					text="SAVE"
					_onClick={createPost} />
			</Grid>
		</React.Fragment>
	)
}

export default PostWrite;