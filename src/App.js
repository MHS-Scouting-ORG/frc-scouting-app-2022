import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'

import Header from './components/Header/Header';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard';

import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap';
import { Container } from 'react-bootstrap'

function App() {
  const [mobileMenuShow, setMobileMenuShow] = useState(false);

  return (
    <Router>
	 	<MenuDrawer show={ mobileMenuShow } handleMobileMenu={ setMobileMenuShow } />
	 	<Header handleMobileMenu={ setMobileMenuShow } mobileMenuShow={ mobileMenuShow } />
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>i
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

let exportApp = App
if(process.env.REACT_APP_ENABLE_AUTH === '1')
  exportApp = withAuthenticator(App)

export default exportApp
