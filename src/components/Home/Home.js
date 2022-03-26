import React, { useState, useEffect, useMemo } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { a, API } from 'aws-amplify'
import SummaryTable from '../Table/SummaryTable'
import api from '../../api'
import classes from '../Form/Form.module.css'

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
      <SummaryTable/>
      <br/>
      <img src={"./images/tarmac.jpg"} width="640" height="480"></img>
    </div>
  )
}

export default Home;
