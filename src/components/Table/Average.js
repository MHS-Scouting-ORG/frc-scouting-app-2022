import React from "react";

const Averages = (info) => {

    const averagePoints = () => {
        let getPoints = info.map((o) => o.Summary.TeamNumber);
        let totalPoints = 0;

        for(let i=0; i<getPoints.length; i++){
            totalPoints += getPoints[i];
        }

        let average = totalPoints / info.length;

        return average;
    }

    const strategy = () => {
        let getstrat = info.map((o) => o.Strategy);
        let strat = '';


    }

    const averageLowAccuracy = () => {
        let getLowAcc = info.map((o) => o.Summary.LowHubAccuracy);
        let lowHubAccuracy = 0;

        for(let i=0; i<getLowAcc.length; i++){
            lowHubAccuracy += getLowAcc[i];
        }

        let average = lowhubAccuracy / info.length;
        
        return average;
    }

    const lowHubShots = () => {
        let getLowShots = info.map((o) => o.AutoLowMade + o.TeleLowMade);
        let totalLowMade = 0;

        for(let i=0; i<getLowShots.length; i++){
            totalLowMade += getLowShots[i];
        }

        let average = totalLowMade / info.length;
        
        return average;
    }

    const highHubAccuracy = () => {
        let getUpperAcc = info.map((o) => o.Summary.UpperHubAccuracy);
        let upperHubAccuracy = 0;

        for(let i=0; i<getUpperAcc.length; i++){
            upperHubAccuracy += getUpperAcc[i];
        }

        let average = upperHubAccuracy / info.length;
        
        return average;
    }

    const upperHubShots = () => {
        let getUpperShots = info.map((o) => o.AutoUpperMade + o.TeleUpperMade);
        let totalUpperMade = 0;

        for(let i=0; i<getUpperShots.length; i++){
            totalUpperMade += getUpperShots[i];
        }

        let average = totalUpperMade / info.length;
        
        return average;
    }

    const hangar = () => {
        let getHangarPoints = info.map((o) => {
            if(o.Hangar === 'None' || 'Attempted'){
                return 0;
            }
            else if(o.Hangar === 'Low'){
                return 4;
            }
            else if(o.Hangar === 'Mid'){
                return 6;
            }
            else if(o.Hangar === 'High'){
                return 10;
            }
            else if (o.Hangar === 'Traversal'){
                return 15;
            }
            else{
                return 0;
            }
        });
        let totalHangarPoints = 0;

        for(let i=0; i<getHangarPoints.length; i++){
            totalHangarPoints += getHangarPoints[i];
        }

        let average = totalHangarPoints / info.length;
        
        return average;
    }

    return({
        TeamNumber: 0,
        Strategy: "",
        AveragePoints: 0,
        AverageLowHubShots: 0,
        AverageLowAccuracy: 0,
        AverageUpperHubShots: 0,
        AverageUpperAccuracy: 0,
        AverageHangar: 0,
    });
}

export default Averages;