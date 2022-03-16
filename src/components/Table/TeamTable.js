import { isModelAttributePrimaryKey } from "@aws-amplify/datastore";
import React from "react";
import { useTable, useSortBy } from "react-table";


const TeamTable = (props) => {

  const data = props.information;

  const makeColumns = (a) => {
    return {
      Header: a,
      accessor: a,
    }
  }

  const columnValues = Object.keys(data[0]);

  /*const columns = React.useMemo(
    () =>
      columnValues.map(makeColumns).sort(), []
  )*/

  const columns = React.useMemo(
    () => [
      {
        Header: 'Match Summary',
        columns: [
          {
            Header: 'Match',
            accessor: 'MatchId',
          },
          {
            Header: 'Priorities',
            accessor: 'Strategy',
          },
          {
            Header: 'Total Points',
            accessor: 'TotalPoints',
          },
          {
            Header: 'Low Hub Accuracy',
            accessor: 'LowHubAccuracy',
          },
          {
            Header: 'Upper Hub Accuracy',
            accessor: 'UpperHubAccuracy',
          },]
      },
      {
        Header: 'Autonomous',
        columns: [
          {
            Header: 'Auto Placement',
            accessor: 'AutoPlacement',
          },
          {
            Header: 'Auto Low Made',
            accessor: 'AutoLowMade',
          },
          {
            Header: 'Auto Low Missed',
            accessor: 'AutoLowMissed',
          },
          {
            Header: 'Auto Upper Made',
            accessor: 'AutoUpperMade',
          },
          {
            Header: 'Auto Upper Missed',
            accessor: 'AutoUpperMissed',
          },
          {
            Header: 'Taxi',
            accessor: 'Taxi',
          },]
      },
      {
        Header: 'Tele-Op',
        columns: [
          {
            Header: 'Tele Low Made',
            accessor: 'TeleLowMade',
          },
          {
            Header: 'TeleLowMissed',
            accessor: 'TeleLowMissed',
          },
          {
            Header: 'TeleUpperMade',
            accessor: 'TeleUpperMade',
          },
          {
            Header: 'Tele Upper Missed',
            accessor: 'TeleUpperMissed',
          },
          {
            Header: 'Hangar',
            accessor: 'Hangar',
          },]
      },
      {
        Header: 'Game Info',
        columns: [
          {
            Header: 'Hangar and Cargo Bonus',
            accessor: 'HangarCargoBonus',
          },
          {
            Header: '# of Ranking Points',
            accessor: 'NumberOfRankingPoints',
          },
          {
            Header: '# of Fouls',
            accessor: 'NumberOfFouls',
          },
          {
            Header: '# of Tech Fouls',
            accessor: 'NumberOfTech',
          },
          {
            Header: 'Penalties',
            accessor: 'Penalties',
          },]
      },
      {
        Header: 'Scouter Info',
        columns: [
          {
            Header: 'Opinion',
            accessor: 'OpinionScale',
          },
          {
            Header: 'Comments',
            accessor: 'Comments',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },]
      }
    ], []
  )

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div>
      <table {...getTableProps()}>

        <thead>
          {
            headerGroups.map(headerGroup =>
            (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {
                  headerGroup.headers.map(column =>
                  (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        padding: '10px',
                        border: 'solid 1px black',
                        textAlign: 'center',
                        background: 'papayawhip'
                      }}
                    >
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
            rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: '10px',
                            border: 'solid 1px black',
                            textAlign: 'center',
                          }}
                        >
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

export default TeamTable;