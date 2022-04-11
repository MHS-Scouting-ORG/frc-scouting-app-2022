import React, { useState, useEffect, useMemo } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { a, API } from 'aws-amplify'
import Summary from '../Table/SummaryTable'
import api from '../../api'
import TestTable from'../Table/Test.js'

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
      {/*<TestTable/>*/}
      <br/>
      <img src={"./images/tarmac.jpg"} width="320" height="240"></img>
    </div>
  )
}

export default Home;
