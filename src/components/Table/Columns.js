export const Columns = [
    {
        Header: 'Team #',
        accessor: 'TeamNumber',
    },
    {
        Header: 'Match Information',
        columns: [
            {
                Header: 'Match Number',
                accessor: 'MatchNumber',
            },
            {
                Header: 'Alliance Color',
                accessor: 'AllianceColor'
            },
        ],
    },
    {
        Header: 'Autonomous',
        accessor: ''
    },
    {
        Header: 'Tele-Op',
        accessor: ''
    },
]