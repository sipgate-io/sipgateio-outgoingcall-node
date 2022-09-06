<img src="https://www.sipgatedesign.com/wp-content/uploads/wort-bildmarke_positiv_2x.jpg" alt="sipgate logo" title="sipgate" align="right" height="112" width="200"/>

# sipgate.io node outgoing call example

In order to demonstrate how to initiate an outgoing call, we queried the `/sessions/calls` endpoint of the sipgate REST API.

For further information regarding the sipgate REST API please visit https://api.sipgate.com/v2/doc

### Prerequisites

- Node.js >= 10.15.3
- VoIP client

### How To Use

Navigate to the project's root directory.

Installing dependencies:

```bash
$ npm install
```

 Create the `.env` file by copying the `.env.example`. Set the values according to the comment above each variable.

The token should have the following scopes:

- `sessions:calls:write`

For more information about personal access token, visit https://www.sipgate.io/rest-api/authentication#personalAccessToken.

The `deviceId` uniquely identifies the phone extension which establishes the phone connection,
this variable is needed only when the `caller` is a phone number and not a device extension. Further explanation is given in the section [Web Phone Extensions](#web-phone-extensions). Nevertheless you can still use both as device extension, but in this case the `deviceId` will be ignored.

Use `callee` and `callerId` to set the recipient phone number and the displayed caller number respectively.

Run the application:

```bash
$ npm run start
```

##### How It Works

The following explanations lay out how the code example works. There is no need for you to change anything unless you want to do something different.

The sipgate REST API is available under the following base URL:

```javascript
const baseURL = "https://api.sipgate.com/v2";
```

The request body contains the fields: `deviceId`, `caller`, `callee` and `callerId` as specified above.

```javascript
const requestBody = {
  deviceId,
  callerId,
  caller,
  callee,
};
```

We use the axios package for request execution. The
`requestOptions` object contains the keys `method`, `headers`, `auth`, `baseURL` and `data` (previously referred) which will be used by axios in order to send the desired http post request. Axios will use the credentials from `auth` to generate the required Basic Auth header as authorization header (for more information on Basic Auth see our [code example](https://github.com/sipgate-io/sipgateio-basicauth-node)).

**Note:** The API expects request data in JSON format. Thus the `Content-Type` header is set to: `application/json`.

```javascript
const requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  auth: {
    username: tokenId,
    password: token,
  },
  data: requestBody,
};
```

> If OAuth should be used for `Authorization` instead of Basic Auth we do not suply the auth object in the request options. Instead we set the authorization header to `Bearer` followed by a space and the access token: `` Authorization: `Bearer ${accessToken}`, ``. For an example application interacting with the sipgate API using OAuth see our [sipgate.io Node.js OAuth example](https://github.com/sipgate-io/sipgateio-oauth-node).

The `axios` instance takes the request URL and `requestOptions` as arguments and process the desired http request. The request URL consists of the base URL defined above and the endpoint `/sessions/calls`.

```javascript
axios(`${baseURL}/sessions/calls`, requestOptions)
  .then((response) => {
    console.log(`Status: ${response.status}`);
    console.log(`Body: ${JSON.stringify(response.data)}`);
  })
  .catch((error) => console.log("Error: ", error.message));
```

### Web Phone Extensions

A Web Phone extension consists of one letter followed by a number (e.g. 'e0'). The sipgate API uses the concept of Web Phone extensions to identify devices within your account that are enabled to initiate calls.

Depending on your needs you can choose between the following phone types:

| phone type     | letter |
| -------------- | ------ |
| voip phone     | e      |
| external phone | x      |
| mobile phone   | y      |

You can find out what your extension is as follows:

1. Log into your [sipgate account](https://app.sipgate.com/login)
2. Use the sidebar to navigate to the **Phones** (_Telefone_) tab
3. Click on the device from which you want the Web Phone extension (`deviceId`)
4. The URL of the page this takes you to should have the form `https://app.sipgate.com/{...}/devices/{deviceId}` where `{deviceId}` is your Web Phone extension

### Common Issues

#### API returns 200 OK but no call gets initiated

Possible reasons are:

- your phone is not connected
- `caller` does not match your phones Web Phone extension

#### HTTP Errors

| reason                                                                                                                            | errorcode |
| --------------------------------------------------------------------------------------------------------------------------------- | :-------: |
| bad request (e.g. request body fields are empty or only contain spaces, timestamp is invalid etc.)                                |    400    |
| tokenId and/or token are wrong                                                                                                    |    401    |
| insufficient account balance                                                                                                      |    402    |
| no permission to use specified Web Phone extension (e.g. user password must be reset in [web app](https://app.sipgate.com/login)) |    403    |
| wrong REST API endpoint                                                                                                           |    404    |
| wrong request method                                                                                                              |    405    |
| wrong or missing `Content-Type` header with `application/json`                                                                    |    415    |

### Related

- [axios documentation](https://www.npmjs.com/package/axios)

### Contact Us

Please let us know how we can improve this example.
If you have a specific feature request or found a bug, please use **Issues** or fork this repository and send a **pull request** with your improvements.

### License

This project is licensed under **The Unlicense** (see [LICENSE file](./LICENSE)).

### External Libraries

This code uses the following external libraries

- axios:
  Licensed under [The MIT License](https://opensource.org/licenses/MIT)
  Website: https://github.com/axios/axios

---

[sipgate.io](https://www.sipgate.io) | [@sipgateio](https://twitter.com/sipgateio) | [API-doc](https://api.sipgate.com/v2/doc)
