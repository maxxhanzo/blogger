import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

	handleOnSubmit = (e) => {
		e.preventDefault();
		const title = this.title.value;
		const content = this.content.value;
		if(title == "" || content == ""){return false;}
		this.props.createPost({title, content}, ()=>{
			this.props.history.push("/");
		})
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleOnSubmit}>
					<input type="text" className="form-field" id="title" ref={(element) => { this.title = element }} />
					<textarea className="form-field" id="content" ref={(element) => { this.content = element }} />
					<button  onClick={this.handleOnSubmit}>Submit</button>
				</form>
			</div>
		)
	}
}

export default connect(null, { createPost })(PostsNew);

