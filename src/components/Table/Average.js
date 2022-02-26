import { loadingBar } from "aws-amplify";
import SampleData from "./Data";
import React from "react";

const Averages = (teamNumber) => {

    const data = SampleData();

    // get objects of certain team number
    let info = () => data.filter((x) => x.TeamNumber === teamNumber)
    console.log(info);

    /*const teamObject = {
        TeamNumber: 0,
        Strategy: '',
        AveragePoints: 0,
        AverageLowHubShots: 0,
        AverageLowHubAccuracy: 0,
        AverageUpperHubShots: 0,
        AverageUpperHubAccuracy: 0,
        AverageHangar: 0,
    }
    */

    const points = () => {
        let getPoints = info.map((o) => o.Summary.TotalPoints); //array of points from team info
        let totalPoints = 0;

        for(let i=0; i<getPoints.length; i++){
            totalPoints += getPoints[i];
        }

        let average = totalPoints / info.length;

        return average;
    }

    const strategy = () => {
        let list = [];

        let strategies = info.forEach(element => {
            let array = element.Strategy;
            if(array[0]===true && !list.includes(array[0])){
                list.push("Low Hub Shooter")
            }
            if(array[1]===true && !list.includes(array[1])){
                list.push("Upper Hub Shooter")
            }
            if(array[2]===true && !list.includes(array[2])){
                list.push("Launchpad User")
            }
            if(array[3]===true && !list.includes(array[3])){
                list.push("Hangar")
            }
            if(array[4]===true && !list.includes(array[4])){
                list.push("Defense")
            }
        });
        //low hub shooter(6), upper hub shooter(7), launchpad(8), hangar(9), defense (10)
    }

    const lowHubAccuracy = () => {
        let lowAccuracies = info.map((o) => o.Summary.LowHubAccuracy);
        let sum = 0;

        for(let i=0; i<lowAccuracies.length; i++){
            sum += lowAccuracies[i];
        } 

        let average = sum / info.length;
        return average;
    }

    const lowHubShots = () => {
        let shotsMade = info.map((o) => (o.AutoLowMade + o.TeleLowMade));
        let totalLowMade = 0;

        for(let i=0; i<shotsMade.length; i++){
            totalLowMade += shotsMade[i];
        }

        let average = totalLowMade / info.length;
        return average;
    }

    const upperHubAccuracies = () => {
        let upperAccuracies = info.map((o) => o.Summary.UpperHubAccuracy);
        let sum = 0;

        for(let i=0; i<upperAccuracies.length; i++){
            sum += upperAccuracies[i];
        }

        let average = sum / info.length;
        return average;
    }

    const upperHubShots = () => {
        let shotsMade = info.map((o) => (o.AutoUpperMade + o.TeleUpperMade));
        let totalUpperMade = 0;

        for(let i=0; i<shotsMade.length; i++){
            totalUpperMade += shotsMade[i];
        }

        let average = totalUpperMade / info.length;
        return average;
    }

    const hangar = () => {
        let hangarPoints = info.map((o) => {
            if(o.Hangar === 'None' || o.Hangar === 'Attempted'){
                return 0;
            } else if(o.Hangar === 'Low'){
                return 4;
            } else if(o.Hangar === "Mid"){
                return 6;
            } else if(o.Hangar === 'High'){
                return 10;
            } else if(o.Hangar === 'Traversal'){
                return 15;
            } else{
                return 0;
            }
        });

        let sum = 0;

        for(let i=0; i<hangarPoints.length; i++){
            sum += hangarPoints[i];
        }

        let average = sum / info.length;
        return average;
    }


    /*let teamAverage = Object.create(teamObject);
    teamAverage.TeamNumber = teamNumber;
    teamAverage.Strategy = strategy();
    teamAverage.AveragePoints = points();
    teamAverage.AverageLowHubShots = lowHubShots();
    teamAverage.AverageLowHubAccuracy = lowHubAccuracy();
    teamAverage.AverageUpperHubShots = upperHubShots();
    teamAverage.AverageUpperHubAccuracy = upperHubAccuracies();
    teamAverage.AverageHangar = hangar();
    */

    return ({
        TeamNumber: teamNumber,
        Strategy: strategy(),
        AveragePoints: points(),
        AverageLowHubShots: lowHubShots(),
        AverageLowHubAccuracy: lowHubAccuracy(),
        AverageUpperHubShots: upperHubShots(),
        AverageUpperHubAccuracy: upperHubAccuracies(),
        AverageHangar: hangar(),
    }
    
    );

   

}


export default Averages;