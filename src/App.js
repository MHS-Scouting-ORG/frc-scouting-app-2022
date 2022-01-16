import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'
//import React, { useState, useEffect } from 'react'

//import { API } from 'aws-amplify'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Container, Nav, Row, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { Home } from './home'
import { Dashboard } from './dashboard'
import { About } from './about'






function App() {
  return (
    <Router>
      <Container>
        <Navbar>
            <Container>
            <Nav>
              <Nav.Item>
                <LinkContainer to="/">
                <Nav.Link to="/">
                  Home
                </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/about">
                <Nav.Link to="/about">
                  About
                </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/dashboard">
                <Nav.Link to="/dashboard">
                  Dashboard
                </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
            </Container>
        </Navbar>
        

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>i
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default withAuthenticator(App);
