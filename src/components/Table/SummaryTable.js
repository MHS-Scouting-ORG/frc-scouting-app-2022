import React from "react";
import { useTable, useSortBy } from "react-table";
import SampleData from "./Data";

const SummaryTable = (props) => {

    const data = SampleData();

    const columns = React.useMemo(
        () => [
            {
                Header: 'Team #',
                accessor: 'TeamNumber',
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

export default SummaryTable;