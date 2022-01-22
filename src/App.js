import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'

import Header from './components/Header/Header';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function App() {
  return (
    <Router>
	 	<MenuDrawer />
	 	<Header />
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

//export default withAuthenticator(App);
export default App;
