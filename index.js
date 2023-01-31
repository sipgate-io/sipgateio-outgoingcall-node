const axios = require('axios');

require('dotenv').config()
const {BASE_URL, TOKEN_ID, TOKEN, DEVICE_ID, CALLER_ID, CALLER, CALLEE} = process.env

const requestBody = {
	DEVICE_ID,
	CALLER_ID,
	CALLER,
	CALLEE,
};

const requestOptions = {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	auth: {
		username: TOKEN_ID,
		password: TOKEN,
	},
	data: requestBody,
};

axios(`${BASE_URL}/sessions/calls`, requestOptions)
	.then(response => {
		console.log(`Status: ${response.status}`);
		console.log(`Body: ${JSON.stringify(response.data)}`);
	})
	.catch(error => console.log('Error: ', error.message));
