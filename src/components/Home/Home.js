import React, { useState, useEffect } from 'react'
import { Col, ListGroup, Form, Container, Nav, Row, Navbar, Button } from 'react-bootstrap'
import { a, API } from 'aws-amplify'
import { useTable } from 'react-table'


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
  
  const data = 
     [
        {
            ScouterInitials: 'MM',
            TeamNumber: 2443,
            MatchNumber: 12,
            AllianceColor: 'BLUE',
            AutoLowMade: 0,
            AutoLowMissed: 0,
            AutoUpperMade: 0,
            AutoUpperMissed: 0,
            Taxi: false,
            AutoPlacement: 0,
            TeleLowMade: 0,
            TeleLowMissed: 0,
            TeleUpperMade: 0,
            TeleUpperMissed: 0,
            Hangar: '',
            LaunchpadUse: false,
            NumberOfFouls: 0,
            NumberOfTech: 0,
            YellowCard: false,
            RedCard: false,
            Disabled: false,
            Disqualified: false,
            HangarBonus: false,
            CargoBonus: false,
            NumberOfRankingPoints: 0,
            Strategy: '',
            Comments: '',
            OpinionScale: 0
        },
        {
            ScouterInitials: 'MP',
            TeamNumber: 200,
            MatchNumber: 2,
            AllianceColor: 'BLUE',
            AutoLowMade: 0,
            AutoLowMissed: 0,
            AutoUpperMade: 0,
            AutoUpperMissed: 0,
            Taxi: false,
            AutoPlacement: 0,
            TeleLowMade: 0,
            TeleLowMissed: 0,
            TeleUpperMade: 0,
            TeleUpperMissed: 0,
            Hangar: '',
            LaunchpadUse: false,
            NumberOfFouls: 0,
            NumberOfTech: 0,
            YellowCard: false,
            RedCard: false,
            Disabled: false,
            Disqualified: false,
            HangarBonus: false,
            CargoBonus: false,
            NumberOfRankingPoints: 0,
            Strategy: '',
            Comments: '',
            OpinionScale: 0
        },
        {
            ScouterInitials: 'PO',
            TeamNumber: 65,
            MatchNumber: 3,
            AllianceColor: 'RED',
            AutoLowMade: 0,
            AutoLowMissed: 0,
            AutoUpperMade: 0,
            AutoUpperMissed: 0,
            Taxi: false,
            AutoPlacement: 0,
            TeleLowMade: 0,
            TeleLowMissed: 0,
            TeleUpperMade: 0,
            TeleUpperMissed: 0,
            Hangar: '',
            LaunchpadUse: false,
            NumberOfFouls: 0,
            NumberOfTech: 0,
            YellowCard: false,
            RedCard: false,
            Disabled: false,
            Disqualified: false,
            HangarBonus: false,
            CargoBonus: false,
            NumberOfRankingPoints: 0,
            Strategy: '',
            Comments: '',
            OpinionScale: 0
        },
      ]
  

  

  const makeColumns = function (a) {
    return {
      Header: a,
      accessor: a
    }
  }

  const columns = (

    Object.keys(data[0]).map(a =>
      {
        return {
          Header: a,
          accessor: a
        }
      }
    )
  )
  

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance


  
  return (
    <div>
      <table {...getTableProps()} >
        
       <thead>
          {
            headerGroups.map(headerGroup => 
              (
                <tr {...headerGroup.getHeaderGroupProps()} >
                  {
                    headerGroup.headers.map(column =>
                      (
                        <th {...column.getHeaderProps()} >
                          {column.render('Header')}
                        </th>
                      )
                    )
                  }
                </tr>
              )
            )
          }
      </thead>

      <tbody {...getTableBodyProps()}>
        {
          rows.map( row =>
            {
              prepareRow(row)

              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell =>
                      {
                        return (
                          <td {...cell.getCellProps()} >
                            {cell.render('Cell')}
                          </td>
                        )
                      }
                    )
                  }
                </tr>
              )
            }
          )
        }
      </tbody>

   </table>
    </div>
  )
}

export default Home;