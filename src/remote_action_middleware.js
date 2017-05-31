import 'whatwg-fetch'; //fetch

import { setState } from './action_creators';

const actionToApiMapping = {
	'GET_SERVICES': {
		target: 'services',
		method: 'GET',
		stateKey: 'services'
	},
	'GET_SERVICE_INSTANCES': {
		target: 'serviceInstances',
		method: 'GET',
		stateKey: 'cart'
	},
	'ADD_TO_CART': {
		target: 'serviceInstances',
		method: 'POST',
		stateKey: 'cart'
	},
	'REMOVE_FROM_CART': {
		target: 'serviceInstances',
		method: 'DELETE'
	}
};

export default store => next => action => {

	console.log('in remote http middleware');
	console.log(action);

	const apiObj = actionToApiMapping[action.type]
	if(apiObj) {
		if(apiObj.method === 'GET') {
			return next((dispatch) => {
				getData(apiObj.target, action)
				.then(() => {
					dispatch(setState({
						[apiObj.stateKey]: action.data
					}));
				});

			});
		}
		else if(apiObj.method === 'POST') {
			return next((dispatch) => {
				postData(apiObj.target, action.data)
				.then(() => {
					console.log(action.data);
					dispatch(setState({
						cart: [action.data]
					}));
				});
			});
		}
		else if(apiObj.method === 'DELETE') {
			removeData(apiObj.target, action.data);
			return next(action);
		}
	}
	else {
		return next(action);
	}
}

function createOptions(method, data) {
	let options = {
		method: method,
		headers: { 'Content-Type': 'application/json' }
	};
	if(data) {
		options.body = JSON.stringify(data);
	}
	return options;
}

function getData(targetApi, action) {
	const options = createOptions('GET');
	return fetch(`/api/${targetApi}`, options)
	.then((response) => {
		console.log('data acquired');
		return response.json();
	})
	.then((data) => {
		console.log(data);
		action.data = data;
		return action;
	})
	.catch((error) => {
		throw error;
	});
}

function removeData(targetApi, data) {
	const options = createOptions('DELETE', data);
	fetch(`/api/${targetApi}`, options)
	.then(() => {
		console.log('data removed');
	})
	.catch((error) => {
		throw error;
	});
}

function postData(targetApi, data) {
	const options = createOptions('POST', data);
	return fetch(`/api/${targetApi}`, options)
	.then((response) => {
		console.log('data saved');
		return response.json();
		
	})
	.then((responseObj) => {
		data.id = responseObj.id;
	})
	.catch((error) => {
		throw error;
	});
}
