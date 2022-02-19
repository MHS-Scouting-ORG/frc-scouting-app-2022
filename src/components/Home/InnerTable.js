import React from 'react';
import { useTable, useSortBy } from 'react-table'

const InnerTable = (props) => {

  const data = React.useMemo(
    () => [
      {
        ScouterInitials: 'MM',
        TeamNumber: 2442,
        MatchNumber: 2,
        AllianceColor: 'BLUE',
        AutoLowMade: 0,
        AutoLowMissed: 0,
        AutoHighMade: 0,
        AutoHighMissed: 0,
        Taxi: 'false',
        AutoPlacement: 0,
        TeleLowMade: 0,
        TeleLowMissed: 0,
        TeleUpperMade: 6,
        TeleUpperMissed: 15,
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
        Comment: '',
        OpinionScale: 0
      },
      {
        ScouterInitials: 'SF',
        TeamNumber: 505,
        MatchNumber: 2,
        AllianceColor: 'RED',
        AutoLowMade: 0,
        AutoLowMissed: 0,
        AutoHighMade: 0,
        AutoHighMissed: 0,
        Taxi: 'false',
        AutoPlacement: 0,
        TeleLowMade: 0,
        TeleLowMissed: 0,
        TeleUpperMade: 6,
        TeleUpperMissed: 15,
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
        Comment: '',
        OpinionScale: 0
      },
      {
        ScouterInitials: 'BB',
        TeamNumber: 88,
        MatchNumber: 2,
        AllianceColor: 'BLUE',
        AutoLowMade: 0,
        AutoLowMissed: 0,
        AutoHighMade: 0,
        AutoHighMissed: 0,
        Taxi: 'false',
        AutoPlacement: 0,
        TeleLowMade: 0,
        TeleLowMissed: 0,
        TeleUpperMade: 6,
        TeleUpperMissed: 15,
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
        Comment: '',
        OpinionScale: 0
      },
    ],
    []
  )

  const makeColumns = function(a){
    return{
      Header: a,
      accessor: a
    }
  }

  const columns = React.useMemo(
    () =>
      Object.keys(data[0]).map(makeColumns),
      []
  )
  const tableInstance = useTable({ columns, data }, useSortBy)

    const {
      getTableProps,
      getTableBodyProps,
      getSortByToggleProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({columns, data}, useSortBy)

  return (
      <div>
        <div>
          <table {...getTableProps()}>
            <thead> 
              {
               headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                <th {
                  ...column.getHeaderProps(column.getSortByToggleProps())}>
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
                      {...cell.getCellProps()}>
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
          </Button>*/}
      </div>
  )
}

export default InnerTable;

  