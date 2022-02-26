import React from "react";
import { useTable, useSortBy } from "react-table";

class TestTable extends React.Component{
    constructor(props){
        super(props);
        this.renderInfo = this.renderInfo.bind(this);
    }

    renderInfo(){
        let info = this.props.information;
        let keys = Object.keys(info[0]).slice(2);
        let row = info.map(input => {
            let values = [];

            for(let i=0; i<keys.length; i++){
                values.push(<td>{input[i]}</td>);
            }

            return (
                <tr>
                    {input.forEach(val => {
                        <td> {val} </td>
                    })}
                </tr>
            );
            
        });
        return row;
    }

    render(){
        return(
            <table>
                {this.renderInfo}
            </table>
        );
    };
}

export default TestTable;