import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import 'whatwg-fetch'; //fetch

import { FieldGroup, FieldGroupDateTime } from './FieldGroup';

import { find } from 'lodash';

import * as actionCreators from './action_creators';
import { connect } from 'react-redux';

// TODO: Form input validation (validationState)
// TODO: Form value saving (onChange handler to set state)

export class ServiceInstance extends Component {
	constructor(props) {
		super(props);

		// initialize app state
		this.state = {};
	}
	componentDidMount() {
		this.setState({
			val: '',
			scheduledDateTime: ''
		});
	}
	render() {

		const chosenService = find(this.props.data,
			(obj) => {
				return obj.serviceId === this.props.match.params.serviceId;
			}
		);

		return <div>
			Hello {this.props.match.params.serviceId}

			<br/>
			{chosenService.name}
			<br/>
			{chosenService.description}
			<br/>
			{chosenService.price}
			<br/>

			<FieldGroup
				id="val"
				type="text"
				label="Value"
				placeholder="Enter Value"
				value={this.state.text}
				onChange={(e) => {
					this.setState({ val: e.target.value});
				}}
			/>

			<FieldGroupDateTime
				id="scheduledDateTime"
				label="Scheduled Date Time"
				onChange={(value) => {
					const dateFormat = 'MM-DD-YYYY h:mm A';
					this.setState({ scheduledDateTime: value.format(dateFormat)});
				}}
			/>

			<Button
				onClick={this.props.addToCart}

				// onClick={() => {
				// 	// TODO: Probably move all this logic elsewhere
				// 	console.log(this.state);
				// 	// TODO: save serviceId, cartId, scheduledDateTime

				// 	const serviceInstance = {
				// 		serviceId: this.props.match.params.serviceId,
				// 		cartId: '2a', // user specific
				// 		scheduledDateTime: this.state.scheduledDateTime
				// 	};

				// 	const options = {
				// 		method: 'POST',
				// 		headers: { 'Content-Type': 'application/json' },
				// 		body: JSON.stringify(serviceInstance)
				// 	};
				// 	fetch('/api/serviceInstances', options)
				// 	.then(() => {
				// 		//let updatedTodos = this.state.todos.map(item => item);
				// 		//updatedTodos.push(todo);
				// 		//this.setState({ todos: updatedTodos });
				// 		console.log('serviceInstance saved');
				// 	})
				// 	.catch((error) => {
				// 		throw error;
				// 	});

				// }}

			>
				Submit
			</Button>
		</div>
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		data: state.cart
	};
}

export const ServiceInstanceContainer = connect(
	mapStateToProps,
	actionCreators
)(ServiceInstance);
