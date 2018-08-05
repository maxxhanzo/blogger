import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../actions';

class EditPost extends Component {

	
	handleOnSubmit = (e) => {
		e.preventDefault();

		const { id } = this.props.match.params;
		const title = this.title.value;
		const content = this.content.value;
		if(title == "" || content == ""){return false;}
		this.props.editPost({title, content}, id, ()=>{
			this.props.history.push("/");
		})
	}
	render() {
		const { post } = this.props;

		if(!post){
			return <div>Direct Access for editing not allowed...</div>
		}

		return (
			<div>
				<form onSubmit={this.handleOnSubmit}>
					<input type="text" className="form-field" id="title" ref={(element) => { this.title = element }} defaultValue={post.title} />
					<textarea className="form-field" id="content" ref={(element) => { this.content = element }} defaultValue={post.content} />
					<button  onClick={this.handleOnSubmit}>Submit</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ posts }, ownProps){
	return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { editPost })(EditPost);

