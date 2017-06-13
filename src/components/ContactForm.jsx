
import React, { Component } from 'react';

// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';

import { toJS } from 'immutable';

const validate = values => {
	const errors = {};

	if(!values.get('firstName')) {
		errors.firstName = 'Required';
	}
	if(!values.get('lastName')) {
		errors.lastName = 'Required';
	}
	if(!values.get('email')) {
		errors.email = 'Required';
	}
	return errors;

};

const renderField = ({ input, label, type, meta: { touched, error } }) => {
	return <div>
		<label>{label}</label>
		<div>
			<input {...input} type={type} placeholder={label}/>
			{touched && error && <span>{error}</span>}
		</div>
	</div>
}

const doSubmit = (values) => {
	console.log(values.toJS());
}

class ContactForm extends Component {
	render() {
		const { handleSubmit, invalid, pristine, reset, submitting } = this.props;

		console.log(submitting);
		console.log(invalid);

		return (
			<form onSubmit={handleSubmit(doSubmit)}>
				<Field name="firstName" component={renderField} type="text" label="First Name"/>
				<Field name="lastName" component={renderField} type="text" label="Last Name"/>
				<Field name="email" component={renderField} type="email" label="E-mail"/>
				<div>
					<button type="submit" disabled={invalid || submitting}>Submit</button>
					<button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
				</div>
			</form>
		);
	}
}

// Decorate the form component
export default reduxForm({
	form: 'contact', // a unique name for this form
	validate, // validation function
})(ContactForm);