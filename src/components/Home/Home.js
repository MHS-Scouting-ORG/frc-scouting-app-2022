import React, { useState, useEffect } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import api from '../../api/index'
import { useTable, useSortBy } from 'react-table'
import Columns from '../Table/Columns'
import { Data } from '../Table/SampleData'

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









  
  const data = React.useMemo(
    () => [
      {
        teamNumber: '2443',
        averagePoints: 'a',
        averageLowHub: '10',
        averageHighHub: '10',
        averageLowAccuracy: '99%',
        averageHighAccuracy: '99%',
        averageHangar: '15'
      },
      {
        teamNumber: '66',
        averagePoints: 'b',
        averageLowHub: '2',
        averageHighHub: '4',
        averageLowAccuracy: '90%',
        averageHighAccuracy: '80%',
        averageHangar: '7'
      },
      {
        teamNumber: '12',
        averagePoints: 'c',
        averageLowHub: '2345',
        averageHighHub: '23456',
        averageLowAccuracy: '10%',
        averageHighAccuracy: '11%',
        averageHangar: '10'
      },
    ],
    []
  )
/*    const columns = React.useMemo(
      () => [
        {
          Header: 'Team #',
          accessor: 'teamNumber',
        },
        {
          Header: 'Average Points',
          accessor: 'averagePoints',
        },
        {
          Header: 'Average Low Hub',
          accessor: 'averageLowHub',
        },
        {
          Header: 'Average High Hub',
          accessor: 'averageHighHub',
        },
        {
          Header: 'Average Low Hub Accuracy',
          accessor: 'averageLowAccuracy',
        },
        {
          Header: 'Average High Hub Accuracy',
          accessor: 'averageHighAccuracy',
        },
        {
          Header: 'Average Hangar Points',
          accessor: 'averageHangar',
        },
      ],
      []
    )
*/
  //  const columns = 

    const tableInstance = useTable({columns, data}, useSortBy)

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({columns, data}, useSortBy)

  return (
      <div>
        <div>
          <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead> 
              {
               headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                <th {
                  ...column.getHeaderProps(column.getSortByToggleProps())}
                  style = {{
                    borderBottom: 'solid 3 px red',
                    background: 'lightblue',
                    border: 'solid 1px black',
                    color: 'black',
                    padding: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {
                    column.render('Header')
                  }
                </th>
                  ))}
              </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {
                rows.map(row => {
                  prepareRow(row)
              
                  return(
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {

                    return(
                    <td 
                      {...cell.getCellProps()}
                      style = {{
                        padding: '10px',
                        border: 'solid 1px gray',
                        textAlign: 'center',
                        background: 'lightyellow',
                      }}
                    >
                      {
                        cell.render('Cell')}
                    </td>
                    )
                   })}
                  </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
            {/*<Button variant="primary" type="submit" onClick={evt => {
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
          </Button> */}
      </div>
  ) 
} 

export default Home;
