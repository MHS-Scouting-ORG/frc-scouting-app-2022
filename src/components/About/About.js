import React, { useEffect, useState } from 'react';

import { Row } from 'react-bootstrap'

import api from '../../api/index'

const About = (props) => {

  const [year, setYear] = useState(-1)
  const [ team_info, setTeamInfo ] = useState("")

  useEffect(function() {
    api.getYear()
      .then(function (data) {
        setYear(data)
      })
    
    api.getBlueAllianceAuthKey()
      .then(data => {
        return api.getTeamInfo(data)
      })
      .then(data => {
        setTeamInfo(JSON.stringify(data))
      })

  }, [])

  return (
      <Row>
        Basic Application for data entry.  The year is {year}.  
        Team Info {team_info}

      </Row>
   )
}

export default About;
