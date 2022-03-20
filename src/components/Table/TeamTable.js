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
  let columnValues = Object.keys(data[0]);

  const columns = React.useMemo(
    () =>
      columnValues.map(makeColumns).sort(), []
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