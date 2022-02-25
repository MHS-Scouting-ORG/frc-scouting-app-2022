import React from "react";
import { useTable, useSortBy } from "react-table";
import SampleData from "./Data";

const TeamTable = (team) => {

  const data = SampleData();

  const makeColumns = function (a) {
    return {
      Header: a,
      accessor: a,
    }
  }

  let keys = Object.keys(data[0]);
  let columnValues = Object.keys(data[0]).slice(2);

  const columns = React.useMemo(
    () =>
      columnValues.map(makeColumns),
      []
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
      <table {...getTableProps()} >

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
                        textAlign: 'center',
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