import React, { useState, useEffect } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import api from '../../api/index'

const Home = (props) => {

  const [teams, setTeams] = useState([])
  const [update, setUpdate] = useState(true)
  const [teamId, setTeamId] = useState("")
  const [teamName, setTeamName] = useState("")
  const [matchId, setMatchId] = useState(0)
  useEffect(() => {
    api.get('frcScoutingApi','/teams')
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
              api.put('frcScoutingApi','/teams', {
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

export default Home;
