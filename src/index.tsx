import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./utils/config";
//import {UserContextInterface} from "./utils/UserContext";
//import reportWebVitals from './reportWebVitals';

let amplifyConfig = {
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        oauth: {
            domain: config.cognito.APP_CLIENT_DOMAIN,
            redirectSignIn: window.location.origin + "/",
            redirectSignOut: window.location.origin,
            scope: ["email", "openid", "aws.cognito.signin.user.admin", "profile"],
            responseType: "token",
        },
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
    },
    API: {
        endpoints: [
            {
                name: "changeRequestAPI",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION,
            },
            {
                name: "userDataAPI",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION,
            },
        ],
    },
};

try {
    Amplify.configure(amplifyConfig);
} catch (err) {
    console.log(err)
    localStorage.setItem("awsError", "true");
    alert("AWS Configuration Error: " + err)
}
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
