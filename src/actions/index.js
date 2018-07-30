import axios from 'axios';

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = '?key=sdgfsdg1223';
export function fetchPosts(){
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	return {
		type: "FETCH_POSTS",
		payload: request
	};
}

export function createPost(values, callback){
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values).then(()=>callback());
	return {
		type: "CREATE_POST",
		payload: request
	};	
}