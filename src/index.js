import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
import 'bootstrap/dist/css/bootstrap.min.css'
if(process.env.NODE_ENV === 'production') {
  console.log(JSON.stringify(awsExports.oauth))
  awsExports.oauth['redirectSignIn'] = process.env.REACT_APP_REDIRECT_URI
  awsExports.oauth['redirectSignOut'] = process.env.REACT_APP_REDIRECT_URI
  console.log(JSON.stringify(awsExports.oauth))
  console.log(process.env.NODE_ENV)
  
  Amplify.configure(awsExports)
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
