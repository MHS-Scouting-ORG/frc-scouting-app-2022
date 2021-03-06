import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useExpanded} from 'react-table';
import List from './List'
import TeamTable from './TeamTable'
import api from "../../api";

const TestTable = () => {

    const [apiData, setApiData] = useState([]);     // api data
    const [teamNumbers, setTeamNumbers] = useState([]);
    const [averages, setAverages] = useState([]);   // averaged data
    const [tempData, setTempData] = useState([]);    // "final" data

    const [sortBy, setSortBy] = useState([]);

    useEffect(() => {                                // Sets team numbers of objects
        getTeams()
            .then(data => {
                setTeamNumbers(data);
            })
    }, [])

    useEffect(() => {                               // Get data from api
        console.log('updating data')
        api.get()
            .then(data => {
                setApiData(data);
            })
    }, [teamNumbers])

    useEffect(() => setAverages(teamNumbers.map(team => {   // Calculate averages for each team
        const teamStats = apiData.filter(x => parseInt(x.TeamId) === team.TeamNumber);
        const teamMatches = teamStats.map(x => x.MatchId.substring(9));

        const avgPoints = calcAveragePoints(teamStats);
        const strats = getStrat(teamStats);

        const lowHub = teamStats.filter(x => (x.AutoLowMade + x.AutoLowMissed + x.TeleLowMade + x.TeleLowMissed) != 0)
        const avgLowAccuracy = calcLowAcc(lowHub);
        const avgLowShots = calcLowShots(lowHub);

        const upperHub = teamStats.filter(x => (x.AutoUpperMade + x.AutoUpperMissed + x.TeleUpperMade + x.TeleUpperMissed) != 0)
        const avgUpperAccuracy = calcUpperAcc(upperHub);
        const avgUpperShots = calcUpperShots(upperHub);

        const hang = teamStats.filter(x => x.Hangar != 'None')
        const avgHangar = calcHangar(hang);

        return {
            TeamNumber: team.TeamNumber,
            Matches: teamStats.length > 0 ? teamMatches.sort().join(', ') : '',
            Priorities: strats.join(', '),
            AvgPoints: !isNaN(avgPoints) ? avgPoints : '',
            StdDev: 0,
            AvgLowShots: !isNaN(avgLowShots) ? avgLowShots : '',
            AvgLowAcc: !isNaN(avgLowAccuracy) ? avgLowAccuracy : '',
            AvgUpperShots: !isNaN(avgUpperShots) ? avgUpperShots : '',
            AvgUpperAcc: !isNaN(avgUpperAccuracy) ? avgUpperAccuracy : '',
            AvgHangar: !isNaN(avgHangar) ? avgHangar : '',
            SumPriority: 0,

            NLowShots: 0,
            NLowAcc: 0,
            NUpperShots: 0,
            NUpperAcc: 0,
            NHangar: 0,
        };

    })), [apiData, teamNumbers])

    useEffect(() => setTempData(averages.map(team => {
        const maxAvgPoint = getMax(averages.map(team => team.AvgPoints));
        const maxLowShots = getMax(averages.map(team => team.AvgLowShots));
        const maxLowAcc = getMax(averages.map(team => team.AvgLowAcc));
        const maxUpperShots = getMax(averages.map(team => team.AvgUpperShots));
        const maxUpperAcc = getMax(averages.map(team => team.AvgUpperAcc));
        const maxHangar = getMax(averages.map(team => team.AvgHangar));

        const rPoints = team.AvgPoints / maxAvgPoint;
        const rLowShots = team.AvgLowShots / maxLowShots;
        const rLowAcc = team.AvgLowAcc / maxLowAcc;
        const rUpperShots = team.AvgUpperShots / maxUpperShots;
        const rUpperAcc = team.AvgUpperAcc / maxUpperAcc;
        const rHangar = team.AvgHangar / maxHangar;

        return {
            TeamNumber: team.TeamNumber,
            Matches: team.Matches,
            Priorities: team.Priorities,
            AvgPoints: team.AvgPoints,
            StdDev: 0,
            AvgLowShots: team.AvgLowShots,
            AvgLowAcc: team.AvgLowAcc,
            AvgUpperShots: team.AvgUpperShots,
            AvgUpperAcc: team.AvgUpperAcc,
            AvgHangar: team.AvgHangar,
            SumPriority: 0,

            NLowShots: rLowShots,
            NLowAcc: rLowAcc,
            NUpperShots: rUpperShots,
            NUpperAcc: rUpperAcc,
            NHangar: rHangar,
        };

    })), [averages, apiData, teamNumbers])

    const getTeams = async () => {                  // List of teams from the Blue Alliance
        const key = await api.getRegional();
        console.log(`key ${key}`)

        return await fetch(`https://www.thebluealliance.com/api/v3/event/2022hiho/teams`, { mode: "cors", headers: { 'x-tba-auth-key': await api.getBlueAllianceAuthKey() } })
            .catch(err => console.log(err))
            .then(response => response.json())
            .then(data => {
                return data.map(obj => {
                    return {
                        TeamNumber: obj.team_number,
                        Matches: '',
                        Priorities: '',
                        AvgPoints: 0,
                        StdDev: 0,
                        AvgLowShots: 0,
                        AvgLowAcc: 0,
                        AvgUpperShots: 0,
                        AvgUpperAcc: 0,
                        AvgHangar: 0,
                        SumPriority: 0,

                        NLowShots: 0,
                        NLowAcc: 0,
                        NUpperShots: 0,
                        NUpperAcc: 0,
                        NHangar: 0,
                    };
                });
            })
            .catch(err => console.log(err))
    }

    const renderRowSubComponent = ({ row }) => {
        const t = apiData.filter((x) => parseInt(x.TeamId) === row.values.TeamNumber);

        const disp = t.map(x => {
            return {
                Match: x.MatchId.substring(9),
                Strategy: x.Strategy.filter(val => val.trim() != '').length != 0 ? x.Strategy.filter(val => val.trim() != '').map(val => val.trim()).join(', ') : 'N/A',
                TotalPoints: x.TotalPoints,
                LowHubAccuracy: x.LowHubAccuracy != null ? x.LowHubAccuracy.toFixed(2) : 'N/A',
                UpperHubAccuracy: x.UpperHubAccuracy != null ? x.UpperHubAccuracy.toFixed(2) : 'N/A',

                AutoPlacement: x.AutoPlacement,
                AutoLow: `${x.AutoLowMade}/${x.AutoLowMade + x.AutoLowMissed}`,
                AutoUpper: `${x.AutoUpperMade}/${x.AutoUpperMade + x.AutoUpperMissed}`,
                Taxi: x.Taxi,

                TeleLow: `${x.TeleLowMade}/${x.TeleLowMade + x.TeleLowMissed}`,
                TeleUpper: `${x.TeleUpperMade}/${x.TeleUpperMade + x.TeleUpperMissed}`,
                Hangar: x.Hangar,

                HangarCargoBonus: x.HangarCargoBonus.filter(val => val.trim() != '').map(val => val.trim()).join(', '),
                NumberOfRankingPoints: x.NumberOfRankingPoints,
                NumberOfFoulAndTech: `${x.NumberOfFouls} | ${x.NumberOfTech}`,
                Penalties: x.Penalties.filter(val => val.trim() != '').length != 0 ? x.Penalties.filter(val => val.trim() != '').map(val => val.trim()).join(', ') : 'N/A',

                DriveSpeed: x.DriveSpeed != undefined ? x.DriveSpeed : 'N/A',
                SwerveNoSwerve: x.Swerve != undefined ? x.Swerve : 'N/A',
                DriveMobility: x.Mobility != undefined ? x.Mobility : 'N/A',

                Comments: x.Comments.trim(),

                email: x.email.substring(0, x.email.length-17),

            };
        })
        
        return disp.length > 0 ?               // if there is data on team, display a table when expanded
            (<pre>
                <div> {<TeamTable information={disp} />} </div>
            </pre>)
            : (                             // else if no data, notify no data has been collected
                <tr><td style={{
                    padding: '5px',
                    textAlign: 'center',
                }}> No data collected for Team {row.values.TeamNumber}. </td></tr>
            );
    }

    const getMax = (arr) => {                       // Get max of array
        return arr.sort((a, b) => b - a).shift();
    }

    const calcAveragePoints = (arr) => {                        // Calculate average points for each team
        let individualPoints = arr.map(value => value.TotalPoints)      // get all team's points scored in a match
        let totalPoints = 0;
        for (let i = 0; i < individualPoints.length; i++) {             // find the sum
            totalPoints = totalPoints + individualPoints[i]
        }
        let averagePoints = totalPoints / individualPoints.length;      // find average
        return averagePoints.toFixed(3);
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
        return averageLowAccuracy.toFixed(3);
    }

    const calcLowShots = (arr) => {                             // Calculate average low hub shots made in a match
        let lowShots = arr.map(value => (value.AutoLowMade + value.TeleLowMade));
        let sumLowShots = 0;
        for (let i = 0; i < lowShots.length; i++) {                     // find the sum
            sumLowShots = sumLowShots + lowShots[i];
        }
        let averageLowShots = sumLowShots / lowShots.length;            // find the average
        return averageLowShots.toFixed(3);
    }

    const calcUpperAcc = (arr) => {                             // Calculate average upper hub accuracy shots for each team
        let upperAccuracies = arr.map(value => value.UpperHubAccuracy);         // get all team's upper hub accuracies in a match
        let sumHighAccuracies = 0;
        for (let i = 0; i < upperAccuracies.length; i++) {                      // find the sum
            sumHighAccuracies = sumHighAccuracies + upperAccuracies[i];
        }
        let averageUpperAccuracy = sumHighAccuracies / upperAccuracies.length;  // find the average
        return averageUpperAccuracy.toFixed(3);
    }

    const calcUpperShots = (arr) => {                           // Calculate average upper hub shots made for each team
        let upperShots = arr.map(value => (value.AutoUpperMade + value.TeleUpperMade));     // get all team's upper hub shots made in a match
        let sumUpperShots = 0;
        for (let i = 0; i < upperShots.length; i++) {                                       // find the sum
            sumUpperShots = sumUpperShots + upperShots[i];
        }
        let averageUpperShots = sumUpperShots / upperShots.length;                          // find the average
        return averageUpperShots.toFixed(3);
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
        return averageHangar.toFixed(3);
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

        return sum.toFixed(3);                                   // round to the nearest thousandth
    }

    const calcDeviation = (arr, mean) => {
        const distance = arr.map(value => {
            return (value - mean) ** 2;
        })

        const sumOfDistance = () => {
            let sum = 0;
            for (let i=0; i < distance.length; i++){
                sum = sum + distance[i]
            }
            return sum;
        }

        const dev = Math.sqrt( sumOfDistance() / (distance.length) )

        return dev;
    }

    const data = React.useMemo(
        () => tempData.map(team => {
            const grade = calcColumnSort(sortBy, team.NLowShots, team.NLowAcc, team.NUpperShots, team.NUpperAcc, team.NHangar);
            return {
                TeamNumber: team.TeamNumber,
                Matches: team.Matches,
                Priorities: team.Priorities,
                AvgPoints: team.AvgPoints,
                StdDev: team.StdDev,
                AvgLowShots: team.AvgLowShots,
                AvgLowAcc: team.AvgLowAcc,
                AvgUpperShots: team.AvgUpperShots,
                AvgUpperAcc: team.AvgUpperAcc,
                AvgHangar: team.AvgHangar,
                SumPriority: grade !== 0.000 ? grade : "",

                NLowShots: team.NLowShots,
                NLowAcc: team.NLowAcc,
                NUpperShots: team.NUpperShots,
                NUpperAcc: team.NUpperAcc,
                NHangar: team.NHangar,
            }
        }), [tempData, sortBy]
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Team #',
                accessor: 'TeamNumber',
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.values.TeamNumber}
                    </span>)
            },
            {
                Header: 'Matches',
                accessor: 'Matches',
            },
            {
                Header: 'Priority/Strategy',
                accessor: 'Priorities'
            },
            {
                Header: 'Average Points',
                accessor: 'AvgPoints',
            },
            {
                Header: 'SD',
                accessor: 'StdDev',
            },
            {
                Header: 'Average Low Hub',
                accessor: 'AvgLowShots',
            },
            {
                Header: 'Average Low Hub Accuracy',
                accessor: 'AvgLowAcc',
            },
            {
                Header: 'Average Upper Hub',
                accessor: 'AvgUpperShots',
            },
            {
                Header: 'Average Upper Hub Accuracy',
                accessor: 'AvgUpperAcc',
            },
            {
                Header: 'Average Hangar Points',
                accessor: 'AvgHangar',
            },
            {
                Header: 'Column Sort',
                accessor: 'SumPriority',
            }
        ], []
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
            <p> Select checkboxes to choose which priorities to sort by. Then click on <strong>Column Sort</strong>. </p>
            {<List setList={setSortBy}/>}
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
                                                padding: '5px',
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
                                                        padding: '5px',
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
                                        <td colSpan={visibleColumns.length}
                                            style = {{
                                                maxWidth: '1000px'
                                            }}
                                        >
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

export default TestTable;