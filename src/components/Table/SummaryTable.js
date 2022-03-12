import React, { useCallback, useEffect, useState } from 'react'
import { useTable, useSortBy, useExpanded } from "react-table";
import TeamTable from "./TeamTable";
import Checkbox from './Checkbox';
import api from '../../api';

const SummaryTable = () => {



    const [teamNumbers, setTeamNumbers] = useState([]);     // List of teamNumbers from Blue Alliance
    const [teamData, setTeamData] = useState([]);           // List of teamData from API
    const [tdata, setAverages] = useState([]);              // temporary objects of averages

    //const [sortColumns, setSortColumns] = useState([]);
    let list = [];


    useEffect(() => {                                       // Sets teamNumbers state (objects only contain team numbers)
        getTeams()
            .then(data => {
                //console.log(`getting team numbers ${data}`)
                setTeamNumbers(data);
            })
    }, [])

    useEffect(() => {                                       // Get data from api and store into teamData state
        api.get()
            .then(data => {
                //console.log(`getting team numbers ${data}`)
                setTeamData(data)
            })
    }, [teamNumbers])


    useEffect(() => setAverages(teamNumbers.map(team => {
        let teamStats = teamData.filter(x => x.TeamNumber === team.TeamNumber);

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


    const getMax = (arr) => {
        return arr.sort((a, b) => b - a).shift();
    }

    const addOnColumnSort = (bool, value) => {
        if(bool === true){
            list.push(value)
            /*setSortColumns(arr => {
                arr.push(value)
            })*/
        } else {
            /*setSortColumns(arr => {
                arr.filter(val => val !== value)
            });*/
            list = list.filter(val => val !== value)
        }

        console.log(list)
    }

    const getTeams = async () => {
        return await fetch('https://www.thebluealliance.com/api/v3/event/2022hiho/teams', { mode: "cors", headers: { 'x-tba-auth-key': await api.getBlueAllianceAuthKey() } })
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

    const calcAveragePoints = (arr) => {
        let individualPoints = arr.map(value => value.TotalPoints)
        let totalPoints = 0;
        for (let i = 0; i < individualPoints.length; i++) {
            totalPoints = totalPoints + individualPoints[i]
        }
        let averagePoints = totalPoints / individualPoints.length;
        return averagePoints;
    }

    const getStrat = (arr) => {
        let stratList = [];
        arr.forEach(teamObject => {
            let strats = teamObject.Strategy;
            if (strats[0] === "Low Hub " && !stratList.includes("Low Hub Shooter")) {
                stratList.push("Low Hub Shooter")
            }
            if (strats[1] === "Upper Hub " && !stratList.includes("Upper Hub Shooter")) {
                stratList.push("Upper Hub Shooter")
            }
            if (strats[2] === "Launchpad " && !stratList.includes("Launchpad User")) {
                stratList.push("Launchpad User")
            }
            if (strats[3] === "Hangar " && !stratList.includes("Hangar")) {
                stratList.push("Hangar")
            }
            if (strats[4] === "Defense " && !stratList.includes("Defense")) {
                stratList.push("Defense")
            }
        })
        return stratList;
    }

    const calcLowAcc = (arr) => {
        let lowAccuracies = arr.map(value => value.LowHubAccuracy)
        let sumLowAccuracies = 0;
        for (let i = 0; i < lowAccuracies.length; i++) {
            sumLowAccuracies = sumLowAccuracies + lowAccuracies[i];
        }
        let averageLowAccuracy = sumLowAccuracies / lowAccuracies.length;
        return averageLowAccuracy;
    }

    const calcLowShots = (arr) => {
        let lowShots = arr.map(value => (value.AutoLowMade + value.TeleLowMade));
        let sumLowShots = 0;
        for (let i = 0; i < lowShots.length; i++) {
            sumLowShots = sumLowShots + lowShots[i];
        }
        let averageLowShots = sumLowShots / lowShots.length;
        return averageLowShots;
    }

    const calcUpperAcc = (arr) => {
        let upperAccuracies = arr.map(value => value.UpperHubAccuracy);
        let sumHighAccuracies = 0;
        for (let i = 0; i < upperAccuracies.length; i++) {
            sumHighAccuracies = sumHighAccuracies + upperAccuracies[i];
        }
        let averageUpperAccuracy = sumHighAccuracies / upperAccuracies.length;
        return averageUpperAccuracy;
    }

    const calcUpperShots = (arr) => {
        let upperShots = arr.map(value => (value.AutoUpperMade + value.TeleUpperMade));
        let sumUpperShots = 0;
        for (let i = 0; i < upperShots.length; i++) {
            sumUpperShots = sumUpperShots + upperShots[i];
        }
        let averageUpperShots = sumUpperShots / upperShots.length;
        return averageUpperShots;
    }

    const calcHangar = (arr) => {
        let hangar = arr.map(value => {
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
        for (let i = 0; i < hangar.length; i++) {
            sumHangar = sumHangar + hangar[i];
        }
        let averageHangar = sumHangar / hangar.length;
        return averageHangar;
    }

    const calcRanking = (arr) => {
        let rankings = arr.map(value => (value.OpinionScale));
        let sumRankings = 0;
        for (let i = 0; i < rankings.length; i++) {
            sumRankings = sumRankings + rankings[i];
        }
        let averageRanking = sumRankings / rankings.length;
        return averageRanking;
    }

    const calcColumnSort = (arr, lShots, lAcc, uShots, uAcc, hangar) => {
        let sum = 0;
        console.log(arr)
        if(arr.includes("Low Hub Shooter")){
            sum = sum + lShots;
        }   
        if(arr.includes("Accurate Low Hub Shooter")){
            sum = sum + lAcc;
        }
        if(arr.includes("Upper Hub Shooter")){
            sum = sum + uShots;
        }
        if(arr.includes("Accurate Upper Hub Shooter")){
            sum = sum + uAcc;
        }
        if(arr.includes("Hangar")){
            sum = sum + hangar;
        }
        console.log(sum)

        return sum;
    }


    const data = React.useMemo(
        () => {
            const maxAvgPoint = getMax(tdata.map(team => team.AveragePoints));
            const maxLowShots = getMax(tdata.map(team => team.AverageLowHubShots));
            const maxLowAcc = getMax(tdata.map(team => team.AverageLowHubAccuracy));
            const maxUpperShots = getMax(tdata.map(team => team.AverageUpperHubShots));
            const maxUpperAcc = getMax(tdata.map(team => team.AverageUpperHubAccuracy));
            const maxHangar = getMax(tdata.map(team => team.AverageHangar));

            //console.log("getting max from each column")

            //  return arr.sort((a, b) => b - a).shift();
            return tdata.map(team => {
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

                    SumOfSelected: calcColumnSort(list, rLowShots, rLowAcc, rUpperShots, rUpperAcc, rHangar),
                }
            })

        }, [tdata]
    )


    const columns = React.useMemo(
        () => [
           /* {
                id: 'exp',
                Header: () => null,
                accessor: 'TeamNumber',
                Cell: ({ row }) =>
                (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? '-' : '+'}
                    </span>
                ),
            },*/
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

    const renderRowSubComponent =
        ({ row }) => {

            let t = teamData.filter((x) => x.TeamNumber === row.values.TeamNumber);
            // let info = teamData.filter((x) => x.TeamNumber === row.values.TeamNumber)

            return t.length > 0 ?
                (<pre>
                    <div> {<TeamTable information={t} />} </div>
                </pre>)

                : (
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
            <div>
                <Checkbox value="Low Hub Shooter" changeState={addOnColumnSort}/>
                <Checkbox value="Accurate Low Hub Shooter" changeState={addOnColumnSort}/>
                <Checkbox value="Upper Hub Shooter" changeState={addOnColumnSort}/>
                <Checkbox value="Accurate Upper Hub Shooter" changeState={addOnColumnSort}/>
                <Checkbox value="Hangar" changeState={addOnColumnSort}/>
            </div>
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