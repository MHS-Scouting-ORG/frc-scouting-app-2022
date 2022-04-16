import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useExpanded, useGlobalFilter } from 'react-table';
import List from './List'
import TeamTable from './TeamTable'
import api from "../../api";
import GlobalFilter from "./Filter";
import Comment from "./Comment";
import { APIClass } from "aws-amplify";

const Summary = () => {

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
        const teamStats = apiData.filter(x => parseInt(x.TeamId) === team.TeamNumber).filter(x => parseInt(x.MatchId.substring(x.MatchId.indexOf('_')+2)) !== 0);
        const summaryComment = apiData.filter(x => parseInt(x.TeamId) === team.TeamNumber).filter(x => parseInt(x.MatchId.substring(x.MatchId.indexOf('_')+2)) === 0);
        const teamMatches = teamStats.map(x => x.MatchId.substring(9));

        //console.log(teamStats); console.log(summaryComment);

        const points = teamStats.map(x => x.TotalPoints);
        const avgPoints = calcAveragePoints(teamStats);
        const strats = getStrat(teamStats);

        const lowHub = teamStats.filter(x => (x.AutoLowMade + x.AutoLowMissed + x.TeleLowMade + x.TeleLowMissed) !== 0);
        const lowAcc = lowHub.map(x => x.LowHubAccuracy);
        const avgLowAccuracy = calcLowAcc(lowHub);
        const avgLowShots = calcLowShots(lowHub);

        const upperHub = teamStats.filter(x => (x.AutoUpperMade + x.AutoUpperMissed + x.TeleUpperMade + x.TeleUpperMissed) !== 0);
        const upperAcc = upperHub.map(x => x.UpperHubAccuracy);
        const avgUpperAccuracy = calcUpperAcc(upperHub);
        const avgUpperShots = calcUpperShots(upperHub);

        const hang = teamStats.filter(x => x.Hangar !== 'None')
        const avgHangar = calcHangar(hang);

        return {
            TeamNumber: team.TeamNumber,
            Matches: teamStats.length > 0 ? teamMatches.sort().join(', ') : '',
            Priorities: strats.join(', '),
            AvgPoints: !isNaN(avgPoints) ? `μ=${avgPoints}, σ=${calcDeviation(points, avgPoints)}` : '',
            AvgLowShots: !isNaN(avgLowShots) ? `μ=${avgLowShots}` : '',
            AvgLowAcc: !isNaN(avgLowAccuracy) ? `μ=${avgLowAccuracy}, σ=${calcDeviation(lowAcc, avgLowAccuracy)}` : '',
            AvgUpperShots: !isNaN(avgUpperShots) ? `μ=${avgUpperShots}` : '',
            AvgUpperAcc: !isNaN(avgUpperAccuracy) ? `μ=${avgUpperAccuracy}, σ=${calcDeviation(upperAcc, avgUpperAccuracy)}` : '',
            AvgHangar: !isNaN(avgHangar) ? `μ=${avgHangar}` : '',
            Comments: summaryComment.length > 0 ? summaryComment[0].SummaryComment : '',
            SumPriority: 0,

            NLowShots: 0,
            NLowAcc: 0,
            NUpperShots: 0,
            NUpperAcc: 0,
            NHangar: 0,
        };

    })), [apiData, teamNumbers])

    useEffect(() => setTempData(averages.map(team => {
        const points = Number(team.AvgPoints.substring(2,8));
        const lowShots = Number(team.AvgLowShots.substring(2));
        const lowAcc = Number(team.AvgLowAcc.substring(2,8));
        const upperShots = Number(team.AvgUpperShots.substring(2));
        const upperAcc = Number(team.AvgUpperAcc.substring(2,8));
        const hangar = Number(team.AvgHangar.substring(2));

        const maxAvgPoint = getMax(averages.map(team => team.AvgPoints.substring(2,8)));
        const maxLowShots = getMax(averages.map(team => team.AvgLowShots.substring(2)));
        const maxLowAcc = getMax(averages.map(team => team.AvgLowAcc.substring(2,8)));
        const maxUpperShots = getMax(averages.map(team => team.AvgUpperShots.substring(2)));
        const maxUpperAcc = getMax(averages.map(team => team.AvgUpperAcc.substring(2,8)));
        const maxHangar = getMax(averages.map(team => team.AvgHangar.substring(2)));

        const rPoints = points / maxAvgPoint;
        const rLowShots = lowShots / maxLowShots;
        const rLowAcc = lowAcc / maxLowAcc;
        const rUpperShots = upperShots / maxUpperShots;
        const rUpperAcc = upperAcc / maxUpperAcc;
        const rHangar = hangar / maxHangar;

        return {
            TeamNumber: team.TeamNumber,
            Matches: team.Matches,
            Priorities: team.Priorities,
            AvgPoints: team.AvgPoints,
            AvgLowShots: team.AvgLowShots,
            AvgLowAcc: team.AvgLowAcc,
            AvgUpperShots: team.AvgUpperShots,
            AvgUpperAcc: team.AvgUpperAcc,
            AvgHangar: team.AvgHangar,
            Comments: team.Comments,
            SumPriority: 0,

            NLowShots: !isNaN(rLowShots) ? rLowShots : 0,
            NLowAcc: !isNaN(rLowAcc) ? rLowAcc : 0,
            NUpperShots: !isNaN(rUpperShots) ? rUpperShots : 0,
            NUpperAcc: !isNaN(rUpperAcc) ? rUpperAcc : 0,
            NHangar: !isNaN(rHangar) ? rHangar : 0,
        };

    })), [averages, apiData, teamNumbers])

    const getTeams = async () => {                  // List of teams from the Blue Alliance
        const key = await api.getRegional();
        console.log(`key ${key}`)

        return await fetch(`https://www.thebluealliance.com/api/v3/event/2022casd/teams`, { mode: "cors", headers: { 'x-tba-auth-key': await api.getBlueAllianceAuthKey() } })
            .catch(err => console.log(err))
            .then(response => response.json())
            .then(data => {
                return data.map(obj => {
                    return {
                        TeamNumber: obj.team_number,
                        Matches: '',
                        Priorities: '',
                        AvgPoints: 0,
                        AvgLowShots: 0,
                        AvgLowAcc: 0,
                        AvgUpperShots: 0,
                        AvgUpperAcc: 0,
                        AvgHangar: 0,
                        Comments: '',
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
        const t = apiData.filter((x) => parseInt(x.TeamId) === row.values.TeamNumber && parseInt(x.MatchId.substring(x.MatchId.indexOf('_')+2)) !== 0);

        const disp = t.map(x => {
            return {
                Match: x.MatchId.substring(x.MatchId.indexOf('_')+1),
                Strategy: x.Strategy.filter(val => val.trim() !== '').length !== 0 ? x.Strategy.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
                TotalPoints: x.TotalPoints,
                LowHubAccuracy: x.LowHubAccuracy !== null ? x.LowHubAccuracy.toFixed(2) : '',
                UpperHubAccuracy: x.UpperHubAccuracy !== null ? x.UpperHubAccuracy.toFixed(2) : '',

                AutoPlacement: x.AutoPlacement,
                AutoLow: `${x.AutoLowMade}/${x.AutoLowMade + x.AutoLowMissed}`,
                AutoUpper: `${x.AutoUpperMade}/${x.AutoUpperMade + x.AutoUpperMissed}`,
                Taxi: x.Taxi,

                TeleLow: `${x.TeleLowMade}/${x.TeleLowMade + x.TeleLowMissed}`,
                TeleUpper: `${x.TeleUpperMade}/${x.TeleUpperMade + x.TeleUpperMissed}`,
                Hangar: x.Hangar !== undefined ? x.Hangar : '',
                HangarStart: x.HangarStart !== undefined ? x.HangarStart : '',
                HangarEnd: x.HangarEnd !== undefined ? x.HangarEnd : '',

                HangarCargoBonus: x.HangarCargoBonus ? x.HangarCargoBonus.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
                NumberOfRankingPoints: x.NumberOfRankingPoints !== undefined ? x.NumberOfRankingPoints : '',
                NumberOfFoulAndTech: x.NumberOfFoulAndTech !== undefined ? `${x.NumberOfFouls} | ${x.NumberOfTech}` : 's',
                Penalties: x.Penalties !== undefined && x.Penalties.filter(val => val.trim() !== '').length !== 0 ? x.Penalties.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',

                DriveSpeed: x.DriveSpeed !== undefined ? x.DriveSpeed : '',
                DriveStrength: x.DriveStrength !== undefined ? x.DriveStrength : '',
                DriveMobility: x.DriveMobility !== undefined ? x.DriveMobility : '',

                Comments: x.Comments !== undefined ? x.Comments.trim() : '',

                email: x.email.substring(0, x.email.length-17),

            };
        })
        
        return disp.length > 0 ?               // if there is data on team, display a table when expanded
            (<pre>
                <div> {<TeamTable information={disp} />} </div>
            </pre>)
            : (                             // else if no data, notify no data has been collected
                <div style={{
                    padding: '5px',
                }}> No data collected for Team {row.values.TeamNumber}. </div>
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
        let a = arr.map(teamObj => teamObj.Strategy).reduce((a,b) => a.concat(b), []).filter((item) =>  item.trim() !== '');
        return uniqueArray(a);
    }

    const uniqueArray = (arr) => {
        const a = arr.map(x => x.trim());
        return a.filter((item, index) => {
            return a.indexOf(item, 0) === index;
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

        return dev.toFixed(3);
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
                Comments: team.Comments,
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
                accessor: 'Priorities',
                Cell: ({ row }) => (
                    <div
                        style = {{
                            whiteSpace: 'normal',
                        }}
                    >
                        {row.original.Priorities}
                    </div>
                )
            },
            {
                Header: 'Average Points',
                accessor: 'AvgPoints',
            },
            {
                Header: 'Avg Low Shots',
                accessor: 'AvgLowShots',
            },
            {
                Header: 'Avg Low Accuracy',
                accessor: 'AvgLowAcc',
            },
            {
                Header: 'Avg Upper Shots',
                accessor: 'AvgUpperShots',
            },
            {
                Header: 'Avg Upper Accuracy',
                accessor: 'AvgUpperAcc',
            },
            {
                Header: 'Avg Hangar Points',
                accessor: 'AvgHangar',
            },
            {
                Header: "Comments",
                Cell: ({row}) => {
                    return <div
                        style = {{
                            minWidth: '300px',
                            maxWidth: '300px',
                            textAlign: 'left',
                            padding: '5px',
                            whiteSpace: 'break-spaces'
                        }}
                    >
                        {row.original.Comments}
                    </div>
                }
            },
            {
                Header: 'Column Sort',
                accessor: 'SumPriority',
            }
        ], []
    )

    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy, useExpanded);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        state,
        setGlobalFilter
    } = tableInstance

    const {globalFilter} = state

    return (
        <div>
            <table style={{ width:'1250px' }} >
                <tbody>
                    <tr>
                        <td
                            style={{
                                minWidth: '750px'
                            }}
                        >
                            <p> Select checkboxes to choose which priorities to sort by. Then click on <strong>Column Sort</strong>. </p>
                            {<List setList={setSortBy}/>}
                            <br/>
                        </td>
                        <td>
                            <p
                                style={{
                                    border: '2px solid black',
                                    maxWidth: '240px',
                                    display: 'inline-block',
                                    padding: '5px',
                                }}
                            >
                                <strong>KEY</strong> 
                                <br/> "Avg" / μ = Average
                                <br/> σ = Standard Deviation
                                <br/> Acc = Accuracy
                            </p>
                        </td>
                        <td>
                            <img src={"./images/tarmac.jpg"} width="240px" height="180px"
                                style={{
                                    display: 'inline-block',
                                    margin: '25px'
                                }}
                            ></img>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <br/><br/>

            <GlobalFilter filter={globalFilter} set={setGlobalFilter} />
            <table {...getTableProps()} 
                style={{
                    width: '1250px'
                }}
            >
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
                                                maxWidth: '1200px'
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

export default Summary;