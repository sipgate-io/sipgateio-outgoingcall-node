const axios = require('axios');

require('dotenv').config()
const {baseURL, tokenId, token, deviceId, callerId, caller, callee} = process.env

const requestBody = {
	deviceId,
	callerId,
	caller,
	callee,
};

const requestOptions = {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	auth: {
		username: tokenId,
		password: token,
	},
	data: requestBody,
};

axios(`${baseURL}/sessions/calls`, requestOptions)
	.then(response => {
		console.log(`Status: ${response.status}`);
		console.log(`Body: ${JSON.stringify(response.data)}`);
	})
	.catch(error => console.log('Error: ', error.message));
