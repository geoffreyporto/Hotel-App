import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import { FieldGroup, FieldGroupDateTime } from './FieldGroup';

import { find } from 'lodash';

import * as serviceInstanceActions from '../actions/service_instance_actions';
import { connect } from 'react-redux';

import { toJS } from 'immutable';

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

		const chosenService = find(this.props.data.toJS(),
			(obj) => {
				return obj.id === this.props.match.params.id;
			}
		);

		return <div>
			Hello {this.props.match.params.id}

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
				onClick={() => { 
						const serviceInstanceDetails = {
							serviceId: this.props.match.params.id,
							cartId: '2a', // user specific
							scheduledDateTime: this.state.scheduledDateTime,
							purchased: false
						};
						this.props.addToCart(serviceInstanceDetails); 
					}
				}
			>
				Submit
			</Button>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		data: state.get('services')
	};
}

export const ServiceInstanceContainer = connect(
	mapStateToProps,
	serviceInstanceActions
)(ServiceInstance);
