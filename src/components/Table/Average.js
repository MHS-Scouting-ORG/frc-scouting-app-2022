import React from "react";

const Averages = (info) => {

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
        let stragies = info.map((o) => o.Strategy);
        let lengths = info.map() //low hub shooter(6), upper hub shooter(7), launchpad(8), hangar(9), defense (10)
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

        let average = totalAccuracy / info.length;
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


    return ({
        TeamNumber: points(),
        Priority: '',
        AveragePoints: 0,
        AverageLowHubShots: 0,
        AverageLowHubAccuracy: 0,
        AverageHighHubShots: 0,
        AverageHighHubAccuracy: 0,
        AverageHangar: 0,
    });

}


export default Averages;