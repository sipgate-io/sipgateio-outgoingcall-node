const axios = require('axios');

const baseURL = 'https://api.sipgate.com/v2';

const tokenId = 'YOUR_SIPGATE_TOKEN_ID';
const token = 'YOUR_SIPGATE_TOKEN';

const deviceId = 'YOUR_SIPGATE_DEVICE_EXTENSION';
const caller = 'DIALING_DEVICE';

const callerId = 'DISPLAYED_CALLER_NUMBER';
const callee = 'YOUR_RECIPIENT_PHONE_NUMBER';

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
