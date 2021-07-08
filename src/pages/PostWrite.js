import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements"
import Upload from "../shared/Upload"
// redux
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
	const dispatch = useDispatch();
	const { history } = props;
	
  const is_loggedIn = useSelector((state) => state.user.is_loggedIn);
	const post_list = useSelector((state) => state.post.list);
	// 글 수정 위해 진입했는지 확인
	const post_id = props.match.params.id;
  const is_editing = post_id ? true : false;
	let _post = is_editing ? post_list.find((post) => post.id === post_id) : null;
	// useState ; setState(인풋 텍스트필드 입력값), _post? 수정시 기존 작성내용 : 신규작성 비어있는 필드
	const [contents, setContents] = React.useState(_post ? _post.contents : "");
	// useState; setState(레이아웃형식)
	const [layout_type, setLayoutType] = React.useState(_post ? _post.layout_type : "");

	const is_invalidInput = 
		(contents === "") || 
		(!(layout_type === "a" || layout_type === "b" || layout_type === "c")) ? true : false

	const changedContents = (e) => {setContents(e.target.value);};
	const changedLayoutType = (e) => {setLayoutType(e.target.value);};
	
	// 함수; 글 작성하기, 리덕스 미들웨어 연동
	const createPost = () => {
		dispatch(postActions.createPostFB(contents, layout_type));
	}
	// 함수; 글 수정하기, 리덕스 미들웨어 연동
	const updatePost = () => {
		dispatch(postActions.updatePostFB(post_id, {contents: contents, layout_type: layout_type} ));
	}

	// image Preview
	const preview = useSelector((state) => state.image.preview)
	
	React.useEffect(() => {
    if (is_editing && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();
      return;
    }
		//작성했던 image 가져와서 넣어주기
    if (is_editing) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

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
				<Text type="heading" bold size="2.0rem">WRITE•HERE</Text>
			</Grid>
			<Grid padding="0px 16px">
				<Input 
					value={contents}
          _onChange={changedContents}
					placeholder="게시글을 작성해 주세요." 
					label=""
					multiline 
					type="text"/>
				<Upload />
				{/* <Grid is_flex >
					<Input type="radio" name="layout" id="layout1"/><label htmlFor="layout1">layout1</label>
					<Input type="radio" name="layout" id="layout2"/><label htmlFor="layout2">layout2</label>
					<Input type="radio" name="layout" id="layout3"/><label htmlFor="layout3">layout3</label>
				</Grid> */}
			</Grid>
			<Grid padding="16px">
        <Input
          type="text"
          value={layout_type}
          _onChange={changedLayoutType}
          label="Layout Type"
          placeholder="a, b, c 중 하나를 골라주세요."
        />
      </Grid>
			<Grid>
				<Grid padding="0px 16px">
					<Text type="heading" bold size="1.0rem">PREVIEW</Text>
				</Grid>
				<Image 
					shape="square"
					src={ preview ? preview : "https://firebasestorage.googleapis.com/v0/b/react-assignment-27df2.appspot.com/o/images%2Fyana_hurskaya-HpQFPnCK7_A-unsplash.jpg?alt=media&token=7b7dec91-e2ef-4493-943a-a7e60fc1cba6"}/>
			</Grid>

			<Grid padding="16px">
				{is_editing ? (
					is_invalidInput ? (
						<Button 
						margin="20px 0px" 
						text="UPDATE" 
						_onClick={updatePost}
						disabled							
						/>
					) : (
						<Button 
						margin="20px 0px" 
						text="UPDATE" 
						_onClick={updatePost}							
						/>
					)) : (
					is_invalidInput ? (
						<Button 
						margin="20px 0px" 
						text="SAVE" 
						_onClick={createPost}
						disabled							
						/>
					) : (
						<Button 
						margin="20px 0px" 
						text="SAVE" 
						_onClick={createPost}						
						/>
					))}	
			</Grid>
		</React.Fragment>
	)
}

export default PostWrite;