import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements"
import Upload from "../shared/Upload"

const PostWrite = (props) => {
	return (
		<React.Fragment>
			<Grid padding="16px">
				<Text type="heading" bold size="2.0rem">SHARE•YOUR•MOMENTS</Text>
			</Grid>
			<Grid padding="0px 16px">
				<Input placeholder="" multiline type="text"/>
				<Upload />
				<Grid is_flex>
					<Input type="radio" name="layout" id="layout1"/><label htmlFor="layout1">layout1</label>
					<Input type="radio" name="layout" id="layout2"/><label htmlFor="layout2">layout2</label>
					<Input type="radio" name="layout" id="layout3"/><label htmlFor="layout3">layout3</label>
				</Grid>
			</Grid>
			
			<Grid>
			<Text type="heading" bold size="1.0rem">PREVIEW</Text>
				<Image shape="square"/>
			</Grid>
			<Grid padding="16px">	
				<Button margin="20px 0px" text="SAVE" />
			</Grid>
		</React.Fragment>
	)
}

export default PostWrite;