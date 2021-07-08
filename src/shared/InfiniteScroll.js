import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfiniteScroll = (props) => {
	const {children, callNext, is_next, loading} = props;
	//로딩중이라면 return;
	const _handleScroll = _.throttle(() => {
		if (loading) {
			return;
		}
		//scroll size
		const {innerHeight} = window;
		const {scrollHeight} = document.body;
		const scrollTop = (document.documentElement && document.documentElement.scrollTop) 
			|| document.body.scrollTop;

		if (scrollHeight - innerHeight - scrollTop < 200) {
			callNext();
		}		
	}, 300);

	const handleScroll = React.useCallback(_handleScroll, [loading]);
	React.useEffect(() => {
		if (loading) {
			return;
		}
		// 다음페이지 있으면 스크롤이벤트 구독, 없으면 구독 해제
		if (is_next){
			window.addEventListener("scroll", handleScroll);
		} else{
			window.removeEventListener("scroll", handleScroll);
		}
		//리소스 조금이라도 덜 쓰게 하기 위해 화면에서 사라질 때 해제
		//함수형 컴퍼넌트, cleanup ; unmout
		return () => window.removeEventListener("scroll", handleScroll) 
	}, [is_next, loading]);   

	return(
		<React.Fragment>
			{props.children}
			{ is_next && (<Spinner />)}
		</React.Fragment>
	)
};

InfiniteScroll.defaultProps = {
	children: null,
	callNext: () => {},
	is_next: false,
	loading: false,
}

export default InfiniteScroll;