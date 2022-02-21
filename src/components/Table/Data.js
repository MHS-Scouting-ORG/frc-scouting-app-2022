import React from "react";

const SampleData = () => {
    return (
        React.useMemo(
            () =>
                [
                    {
                        Summary: {
                            TotalPoints: 45,
                            LowHubAccuracy: 75,
                            UpperHubAccuracy: 85
                        },
                        ScouterInitials: 'MM',
                        TeamNumber: 123,
                        AllianceColor: 'BLUE',
                        MatchNumber: 12,
                        AutoLowMade: 4,
                        AutoLowMissed: 5,
                        AutoUpperMade: 6,
                        AutoUpperMissed: 7,
                        Taxi: false,
                        AutoPlacement: 0,
                        TeleLowMade: 8,
                        TeleLowMissed: 9,
                        TeleUpperMade: 10,
                        TeleUpperMissed: 11,
                        Hangar: 15,
                        LaunchpadUse: false,
                        NumberOfFouls: 0,
                        NumberOfTech: 0,
                        YellowCard: false,
                        RedCard: false,
                        Disabled: false,
                        Disqualified: false,
                        HangarBonus: false,
                        CargoBonus: false,
                        NumberOfRankingPoints: 0,
                        Strategy: 'strat',
                        Comments: '',
                        OpinionScale: 0
                    },
                    {
                        Summary: {
                            TotalPoints: 45,
                            LowHubAccuracy: 75,
                            UpperHubAccuracy: 85
                        },
                        ScouterInitials: 'MP',
                        TeamNumber: 123,
                        AllianceColor: 'BLUE',
                        MatchNumber: 2,
                        AutoLowMade: 4,
                        AutoLowMissed: 6,
                        AutoUpperMade: 8,
                        AutoUpperMissed: 10,
                        Taxi: false,
                        AutoPlacement: 0,
                        TeleLowMade: 12,
                        TeleLowMissed: 14,
                        TeleUpperMade: 16,
                        TeleUpperMissed: 12,
                        Hangar: '',
                        LaunchpadUse: false,
                        NumberOfFouls: 0,
                        NumberOfTech: 0,
                        YellowCard: false,
                        RedCard: false,
                        Disabled: false,
                        Disqualified: false,
                        HangarBonus: false,
                        CargoBonus: false,
                        NumberOfRankingPoints: 0,
                        Strategy: 'abcd',
                        Comments: '',
                        OpinionScale: 0
                    },
                    {
                        Summary: {
                            TotalPoints: 45,
                            LowHubAccuracy: 75,
                            UpperHubAccuracy: 85
                        },
                        ScouterInitials: 'PO',
                        TeamNumber: 65,
                        AllianceColor: 'RED',
                        MatchNumber: 3,
                        AutoLowMade: 3,
                        AutoLowMissed: 5,
                        AutoUpperMade: 2,
                        AutoUpperMissed: 2,
                        Taxi: false,
                        AutoPlacement: 1,
                        TeleLowMade: 5,
                        TeleLowMissed: 2,
                        TeleUpperMade: 12,
                        TeleUpperMissed: 6,
                        Hangar: '',
                        LaunchpadUse: false,
                        NumberOfFouls: 0,
                        NumberOfTech: 0,
                        YellowCard: false,
                        RedCard: false,
                        Disabled: false,
                        Disqualified: false,
                        HangarBonus: false,
                        CargoBonus: false,
                        NumberOfRankingPoints: 0,
                        Strategy: 'efg',
                        Comments: '',
                        OpinionScale: 0
                    },
                ],
            [],
        )
    );
}

export default SampleData;