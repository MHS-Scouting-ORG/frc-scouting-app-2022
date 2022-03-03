import React from "react";
import { useTable, useSortBy } from "react-table";

function TestTable (props){
    let info = props.information;
    let columns = Object.keys(info[0]).slice(1);

        return(
            <table>
                <thead>
                    <tr>
                        {columns.map(key => <th key={key}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {info.map(matchdata => {
                        let data = Object.values(matchdata).slice(1)
                        
                        return (
                            <tr>
                                {data.map(value => <td
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px black',
                                        textAlign: 'center',
                                    }}
                                >{value}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
}

export default TestTable;