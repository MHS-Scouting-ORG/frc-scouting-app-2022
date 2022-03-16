import React, { useEffect, useState } from 'react'
import { useTable, useSortBy, useExpanded } from "react-table";
import TeamTable from "./TeamTable";
//import Checkbox from './Checkbox';
import api from '../../api';
import List from './List';

const SummaryTable = () => {

    const [teamNumbers, setTeamNumbers] = useState([]);             // List of teamNumbers from Blue Alliance
    const [teamData, setTeamData] = useState([]);                   // List of teamData from API
    const [dataOfAverages, setAverages] = useState([]);             // Temporary objects of averages

    const [sortColumns, setSortColumns] = useState([]);             // List of checkboxes to sort by
    const [tempData, setTempData] = useState([]);                   // List of data with grade

    const update = (arr) => {                                       // Update sortColumns state
        setSortColumns(arr)                                         // Used in List when one checkbox is clicked
        console.log(`[x] columns update ${arr}`)
    }; 
 
    useEffect(() => {                                               // Sets teamNumbers state (objects only contain team numbers)
        getTeams()
            .then(data => {
                //console.log(`getting team numbers ${data}`)
                setTeamNumbers(data);
            })
    }, [])

    useEffect(() => {                                               // Get data from api and store into teamData state
        console.log('update data')
        api.get()
            .then(data => {
                // /console.log(`getting team numbers ${data}`)
                setTeamData(data)
            })
    }, [teamNumbers])


    useEffect(() => setAverages(teamNumbers.map(team => {           // Calculate averages of each team
        let teamStats = teamData.filter(x => parseInt(x.TeamId) === team.TeamNumber);

        let avgPoints = calcAveragePoints(teamStats);
        let strats = getStrat(teamStats);
        let avgLowAccuracy = calcLowAcc(teamStats);
        let avgLowShots = calcLowShots(teamStats);
        let avgUpperAccuracy = calcUpperAcc(teamStats);
        let avgUpperShots = calcUpperShots(teamStats);
        let avgHangar = calcHangar(teamStats);
        let avgRanking = calcRanking(teamStats);

        return {
            TeamNumber: team.TeamNumber,
            Strategy: strats.join(', '),
            AveragePoints: !isNaN(avgPoints) ? avgPoints : '',
            AverageLowHubShots: !isNaN(avgLowShots) ? avgLowShots : '',
            AverageLowHubAccuracy: !isNaN(avgLowAccuracy) ? avgLowAccuracy : '',
            AverageUpperHubShots: !isNaN(avgUpperShots) ? avgUpperShots : '',
            AverageUpperHubAccuracy: !isNaN(avgUpperAccuracy) ? avgUpperAccuracy : '',
            AverageHangar: !isNaN(avgHangar) ? avgHangar : '',
            AverageRating: !isNaN(avgRanking) ? avgRanking : '',

            RatePoints: 0,
            RateLowShots: 0,
            RateLowAccuracy: 0,
            RateUpperShots: 0,
            RateUpperAccuracy: 0,
            RateHangar: 0,
            SumOfSelected: 0,
        };
    })), [teamData, teamNumbers])

    useEffect(() => setTempData(dataOfAverages.map(team => {    // Calculate each team's grades for each column
        const maxAvgPoint = getMax(dataOfAverages.map(team => team.AveragePoints));
        const maxLowShots = getMax(dataOfAverages.map(team => team.AverageLowHubShots));
        const maxLowAcc = getMax(dataOfAverages.map(team => team.AverageLowHubAccuracy));
        const maxUpperShots = getMax(dataOfAverages.map(team => team.AverageUpperHubShots));
        const maxUpperAcc = getMax(dataOfAverages.map(team => team.AverageUpperHubAccuracy));
        const maxHangar = getMax(dataOfAverages.map(team => team.AverageHangar));


        const rPoints = team.AveragePoints / maxAvgPoint;
        const rLowShots = team.AverageLowHubShots / maxLowShots;
        const rLowAcc = team.AverageLowHubAccuracy / maxLowAcc;
        const rUpperShots = team.AverageUpperHubShots / maxUpperShots;
        const rUpperAcc = team.AverageUpperHubAccuracy / maxUpperAcc;
        const rHangar = team.AverageHangar / maxHangar;


        return {
            TeamNumber: team.TeamNumber,
            Strategy: team.Strategy,
            AveragePoints: team.AveragePoints,
            AverageLowHubShots: team.AverageLowHubShots,
            AverageLowHubAccuracy: team.AverageLowHubAccuracy,
            AverageUpperHubShots: team.AverageUpperHubShots,
            AverageUpperHubAccuracy: team.AverageUpperHubAccuracy,
            AverageHangar: team.AverageHangar,
            AverageRating: team.AverageRating,

            RatePoints: rPoints,
            RateLowShots: rLowShots,
            RateLowAccuracy: rLowAcc,
            RateUpperShots: rUpperShots,
            RateUpperAccuracy: rUpperAcc,
            RateHangar: rHangar,

            SumOfSelected: 0,
        }
    })

    ), [dataOfAverages, teamData, teamNumbers])


    const getMax = (arr) => {                                   // Get max of array
        return arr.sort((a, b) => b - a).shift();
    }

    const getTeams = async () => {                              // Get list of teams from the Blue Alliance
        /*const key = await api.getRegional();
        const b = key.substring(0, 6);
        console.log(b);
        console.log(`https://www.thebluealliance.com/api/v3/event/${b}/teams`);*/
        return await fetch(`https://www.thebluealliance.com/api/v3/event/2022nytr/teams`, { mode: "cors", headers: { 'x-tba-auth-key': await api.getBlueAllianceAuthKey() } })
            .catch(err => console.log(err))
            .then(response => response.json())
            .then(data => {
                return data.map(obj => {
                    return {
                        TeamNumber: obj.team_number,
                        Strategy: '',
                        AveragePoints: 0,
                        AverageLowHubShots: 0,
                        AverageLowHubAccuracy: 0,
                        AverageUpperHubShots: 0,
                        AverageUpperHubAccuracy: 0,
                        AverageHangar: 0,
                        AverageRating: 0,

                        RatePoints: 0,
                        RateLowShots: 0,
                        RateLowAccuracy: 0,
                        RateUpperShots: 0,
                        RateUpperAccuracy: 0,
                        RateHangar: 0,
                        SumOfSelected: 0,
                    };
                });
            })
            .catch(err => console.log(err))
    }

    const calcAveragePoints = (arr) => {                        // Calculate average points for each team
        let individualPoints = arr.map(value => value.TotalPoints)      // get all team's points scored in a match
        let totalPoints = 0;
        for (let i = 0; i < individualPoints.length; i++) {             // find the sum
            totalPoints = totalPoints + individualPoints[i]
        }
        let averagePoints = totalPoints / individualPoints.length;      // find average
        return averagePoints;
    }

    const getStrat = (arr) => {                                 // Create a list of all the priorities/strats for each team
        let a = arr.map(teamObj => teamObj.Strategy).reduce((a,b) => a.concat(b), []).filter((item) => item.trim().length > 0);
        
        return uniqueArray(a);
    }

    const uniqueArray = (arr) => { 
        return arr.filter((item, index) => {
            return index === arr.indexOf(item);
        })
    }

    const calcLowAcc = (arr) => {                               // Calculate average low hub accuracy shots for each team
        let lowAccuracies = arr.map(value => value.LowHubAccuracy)      // get all team's low hub accuracies in a match
        let sumLowAccuracies = 0;
        for (let i = 0; i < lowAccuracies.length; i++) {                // find the sum
            sumLowAccuracies = sumLowAccuracies + lowAccuracies[i];
        }
        let averageLowAccuracy = sumLowAccuracies / lowAccuracies.length;   // find the average
        return Math.round(averageLowAccuracy * 100) / 100;
    }

    const calcLowShots = (arr) => {                             // Calculate average low hub shots made in a match
        let lowShots = arr.map(value => (value.AutoLowMade + value.TeleLowMade));
        let sumLowShots = 0;
        for (let i = 0; i < lowShots.length; i++) {                     // find the sum
            sumLowShots = sumLowShots + lowShots[i];
        }
        let averageLowShots = sumLowShots / lowShots.length;            // find the average
        return averageLowShots;
    }

    const calcUpperAcc = (arr) => {                             // Calculate average upper hub accuracy shots for each team
        let upperAccuracies = arr.map(value => value.UpperHubAccuracy);         // get all team's upper hub accuracies in a match
        let sumHighAccuracies = 0;
        for (let i = 0; i < upperAccuracies.length; i++) {                      // find the sum
            sumHighAccuracies = sumHighAccuracies + upperAccuracies[i];
        }
        let averageUpperAccuracy = sumHighAccuracies / upperAccuracies.length;  // find the average
        return Math.round(averageUpperAccuracy * 100) / 100;
    }

    const calcUpperShots = (arr) => {                           // Calculate average upper hub shots made for each team
        let upperShots = arr.map(value => (value.AutoUpperMade + value.TeleUpperMade));     // get all team's upper hub shots made in a match
        let sumUpperShots = 0;
        for (let i = 0; i < upperShots.length; i++) {                                       // find the sum
            sumUpperShots = sumUpperShots + upperShots[i];
        }
        let averageUpperShots = sumUpperShots / upperShots.length;                          // find the average
        return averageUpperShots;
    }

    const calcHangar = (arr) => {                               // Calculate average hangar points for each team
        let hangar = arr.map(value => {                         // get all team's hangar points scored in a match
            if (value.Hangar === 'None' || value.Hangar === 'Attempted') {
                return 0;
            } else if (value.Hangar === 'Low') {
                return 4;
            } else if (value.Hangar === 'Mid') {
                return 6;
            } else if (value.Hangar === 'High') {
                return 10;
            } else if (value.Hangar === 'Traversal') {
                return 15;
            } else {
                return 0;
            }
        });

        let sumHangar = 0;
        for (let i = 0; i < hangar.length; i++) {               // find the sum
            sumHangar = sumHangar + hangar[i];
        }
        let averageHangar = sumHangar / hangar.length;          // find the average
        return averageHangar;
    }

    const calcRanking = (arr) => {                              // Calculate average opinion scale for each team
        let rankings = arr.map(value => (value.OpinionScale));          // get all team's opinions in a match
        let sumRankings = 0;
        for (let i = 0; i < rankings.length; i++) {                     // find the sum
            sumRankings = sumRankings + rankings[i];
        }
        let averageRanking = sumRankings / rankings.length;             // find the average
        return averageRanking;
    }

    const calcColumnSort = (arr, lShots, lAcc, uShots, uAcc, hangar) => {        // Calculate team's grades based on checkboxes selected
        let sum = 0;                                                        // if value is inside array, add it to grade

        if (arr.includes("Low Hub Shooter")) {
            sum = sum + lShots;
        }
        if (arr.includes("Accurate Low Hub Shooter")) {
            sum = sum + lAcc;
        }
        if (arr.includes("Upper Hub Shooter")) {
            sum = sum + uShots;
        }
        if (arr.includes("Accurate Upper Hub Shooter")) {
            sum = sum + uAcc;
        }
        if (arr.includes("Hangar")) {
            sum = sum + hangar;
        }

        return Math.round(sum * 1000) / 1000;                               // round to the nearest thousandth
    }

    const data = React.useMemo(
        () => tempData.map(team => {

            const grade = calcColumnSort(sortColumns, team.RateLowShots, team.RateLowAccuracy, team.RateUpperShots, team.RateUpperAccuracy, team.RateHangar);
            return {
                TeamNumber: team.TeamNumber,
                Strategy: team.Strategy,
                AveragePoints: team.AveragePoints,
                AverageLowHubShots: team.AverageLowHubShots,
                AverageLowHubAccuracy: team.AverageLowHubAccuracy,
                AverageUpperHubShots: team.AverageUpperHubShots,
                AverageUpperHubAccuracy: team.AverageUpperHubAccuracy,
                AverageHangar: team.AverageHangar,
                AverageRating: team.AverageRating,

                RatePoints: team.RatePoints,
                RateLowShots: team.RateLowShots,
                RateLowAccuracy: team.RateLowAccuracy,
                RateUpperShots: team.RateUpperShots,
                RateUpperAccuracy: team.RateUpperAccuracy,
                RateHangar: team.RateHangar,

                SumOfSelected: grade !== 0 ? grade : "",
            }

        }), [tempData, sortColumns]
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Team #',
                accessor: 'TeamNumber',
                Cell: ({ row }) =>
                (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.values.TeamNumber}
                    </span>)
            },
            {
                Header: 'Priority/Strategy',
                accessor: 'Strategy'
            },
            {
                Header: 'Average Points',
                accessor: 'AveragePoints',
            },
            {
                Header: 'Average Low Hub',
                accessor: 'AverageLowHubShots',
            },
            {
                Header: 'Average Low Hub Accuracy',
                accessor: 'AverageLowHubAccuracy',
            },
            {
                Header: 'Average Upper Hub',
                accessor: 'AverageUpperHubShots',
            },
            {
                Header: 'Average Upper Hub Accuracy',
                accessor: 'AverageUpperHubAccuracy',
            },
            {
                Header: 'Average Hangar Points',
                accessor: 'AverageHangar',
            },
            {
                Header: 'Average Rating',
                accessor: 'AverageRating',
            },
            {
                Header: 'Column Sort',
                accessor: 'SumOfSelected'
            }
        ],
        []
    )

    const renderRowSubComponent = ({ row }) => {
        let t = teamData.filter((x) => parseInt(x.TeamId) === row.values.TeamNumber);
        
        return t.length > 0 ?               // if there is data on team, display a table when expanded
            (<pre>
                <div> {<TeamTable information={t} />} </div>
            </pre>)
            : (                             // else if no data, notify no data has been collected
                <tr><td style={{
                    padding: '10px',
                    textAlign: 'center',
                }}> No data collected for Team {row.values.TeamNumber}. </td></tr>
            );
    }

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
            <p> Select checkboxes to choose which priorities to sort by. Then click on <strong>Column Sort</strong>. </p>
            {<List setList={setSortColumns}/>}
            <br/><br/>
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

                            return (<React.Fragment  >

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