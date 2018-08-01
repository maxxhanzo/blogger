import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field){
		let classname;
		if(field.label == "Content"){classname = "content"}else{classname=""}
		return (
			<div>
				<label>{field.label}</label>
				<input
					className={classname}
					type="text"
					{...field.input}
				/>
				{field.meta.touched ? field.meta.error : ""}
			</div>
		)
	}

	onSubmit(values){
		this.props.createPost(values, ()=>{
			this.props.history.push("/");
		});
	}

	render(){
		const { handleSubmit } = this.props;

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
		);
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
	form: "PostsNewForm"
})(
	connect(null, { createPost })(PostsNew)
);
