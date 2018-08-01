import React, { Component } from 'react';
import connect from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { editPost } from '../actions';


class EditPost extends Component {

	renderField(field){
		return (
			<div>
				<label>{field.label}</label>
				<input
					type="text"
					{...field.input}
				/>
				{field.meta.touched ? field.meta.error : ""}
			</div>
		)
	}

	onSubmit(values){

		const { id } = this.props.match.params;
		this.props.editPost(values, id, ()=>{
			this.props.history.push("/");
		});
		console.log(values, id)
	}

	render(){
		const { handleSubmit } = this.props;
		const { id } = this.props.match.params;
		console.log(id);

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn">Submit</button>
				<Link to="/" className="btn">cancel</Link>
			</form>
		)
	}
}


function validate(values){
	const errors = {};
	if(!values.title){
		errors.title = "Enter a title!";
	}
	if(!values.content){
		errors.content = "Content field is empty!";
	}
	return errors;
}

export default reduxForm({
	validate: validate,
	form: "editPostForm"
})(
	connect(null, { editPost })(EditPost)
	EditPost
);
