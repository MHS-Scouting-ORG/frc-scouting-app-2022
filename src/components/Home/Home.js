import React, { useState, useEffect, useMemo } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { a, API } from 'aws-amplify'
import Summary from '../Table/Summary'
import api from '../../api'

const Home = (props) => {

  const [teams, setTeams] = useState([])
  const [update, setUpdate] = useState(true)
  const [teamId, setTeamId] = useState("")
  const [teamName, setTeamName] = useState("")
  const [matchId, setMatchId] = useState(0)

  useEffect(() => {

    api.get()
      .then(data => {
        setTeams(data)
      })
  }, [update])

  
  
  return (

    <div>
      <h4> Summary Statistics </h4>
      <br/>
      {<Summary/>}
      <br/>
    </div>
  )
}

export default Home;
