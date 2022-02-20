import React, { useEffect, useState } from 'react';

import { Row } from 'react-bootstrap'

import api from '../../api/index'

const About = (props) => {

  const [year, setYear] = useState(-1)

  useEffect(function() {
    api.getYear()
      .then(function (data) {
        setYear(data)
      })
  }, [])

  return (
      <Row>
        Basic Application for data entry.  The year is {year}
      </Row>
   )
}

export default About;
