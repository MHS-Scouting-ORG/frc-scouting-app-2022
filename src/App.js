import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react'
import React, { useState, useEffect } from 'react'

import { API } from 'aws-amplify'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Home() {

  const [teams, setTeams] = useState([])
  const [update, setUpdate] = useState(true)
  const [teamId, setTeamId] = useState("")
  const [teamName, setTeamName] = useState("")
  const [matchId, setMatchId] = useState(0)
  useEffect(() => {
    API.get('frcScoutingApi','/teams')
      .then(data => {
        setTeams(data)
      })
  }, [update])
  
  return (
      <div>
        <Row>
          <Container className="bg-light"> 
          <h1>
          Home
          </h1>
          </Container>
        </Row>
        <Row className="mb-3">
          <Form>
            <Form.Group controlId="TeamId" className="mb-3">
              <Form.Label>Team Id</Form.Label>
              <Form.Control type="text" placeholder="Team Id" onChange={({target:{value}}) => setTeamId(value)}/>
            </Form.Group>

            <Form.Group controlId="TeamName" className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control type="text" placeholder="Team Name" onChange={({target:{value}}) => setTeamName(value)}/>
            </Form.Group>

            <Form.Group controlid="MatchId" className="mb-3">
              <Form.Label>Match Id</Form.Label>
              <Form.Control type="text" placeholder="Match Id" onChange={({target:{value}}) => setMatchId(parseInt(value))}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={evt => {
              evt.preventDefault()
              console.log(`updating new teams ${teamId}, ${teamName}`)
              API.put('frcScoutingApi','/teams', {
                body: {
                  TeamId: teamId,
                  TeamName: teamName,
                  MatchId: matchId
                }
              })
              .then(_ => {

                setUpdate(!update)
              })
              .catch(err => {
                console.log(err)
              })
            }}>
              Submit
            </Button>
          </Form>

          
        </Row>
        <Row>
          <ListGroup>
            {(() => {
              return teams.map(({TeamId}) => <ListGroup.Item>{TeamId}</ListGroup.Item>)
            })()}
          </ListGroup>
        </Row>
      </div>
  )
}

function About() {
  return (
      <Row>
        Basic Application for data entry
      </Row>
   )
}

function Dashboard() {
  return (
    <Row>Dashboard</Row>
  )
}

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
