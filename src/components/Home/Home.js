import React, { useState, useEffect, useMemo } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { a, API } from 'aws-amplify'
import { useTable, useSortBy } from 'react-table'
import TeamTable from '../Table/TeamTable'
import SummaryTable from '../Table/SummaryTable'
import TestTable from '../Table/Test'
import SampleData from '../Table/Data'

const Home = (props) => {

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
      <SummaryTable />
      <TestTable information={SampleData()}/>
    </div>
  )
}

export default Home;
