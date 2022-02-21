import React from "react";
import { useTable, useSortBy, useExpanded } from "react-table";
import SampleData from "./Data";
import TeamTable from "./TeamTable";

const SummaryTable = (props) => {

    const data = SampleData();

    const getTeams = () => {
        /*let list = data.map( (o) => {
                return o.TeamNumber;
        });

        let finList = [];
        
        list.forEach(element => {
            if (finList.includes(element) === false){
                finList.push(element)
            }
        });

        return finList;*/

        fetch('https://www.thebluealliance.com/api/v3/event/2022hiho/teams', { mode: "cors", headers: { 'X-TBA-Auth-Key': 'B9xCtlRyJheUGvzJShpl1QkOor35UTPO8GUtpn7Uq9xB5aJQL44yNzXnTZBHpWXz' } })
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => console.log(data));

    }

    const teams = getTeams();


    const getTeamInfo = (cell) => { // get objects of certain team number
        let info = data.filter((x) => x.TeamNumber === cell.value)
        console.log(info)
        return info;
    }


    const columns = React.useMemo(
        () => [
            { id:'exp',
                Header: () => null,
                Cell: ({row}) => 
                   (
                        <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '-' : '+'}
                        </span>
                    ),
            },
            {
                Header: 'Team #',
                accessor: 'TeamNumber'
            },  
            {
                Header: 'Priority / Strategy',
                accessor: 'Strategy'
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

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
          <pre>
            <code>{<TeamTable/>}</code>
          </pre>
        ),
        []
      )

    const tableInstance = useTable({ columns, data }, useSortBy, useExpanded);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
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

                            return ( <React.Fragment {...row.getRowProps()} >
                                <tr>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td
                                                    onClick = {() => getTeamInfo(cell)}
                                                    {...cell.getCellProps()}
                                                    style={{
                                                        padding: '10px',
                                                        border: 'solid 1px black',
                                                        textAlign: 'center',
                                                    }}>
                                                    {cell.render('Cell')}

                                                </td>
                                            )
                                        }
                                        )
                                    }
                                </tr>

                                {row.isExpanded ? (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                                </React.Fragment>
                            )
                        }
                        )
                    }
                </tbody>

            </table>

        </div>
    )

}

export default SummaryTable;