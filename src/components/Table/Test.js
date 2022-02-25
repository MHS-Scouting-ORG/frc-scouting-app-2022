import React from "react";
import { useTable, useSortBy } from "react-table";
import TeamTable from "./TeamTable";

class TestTable extends React.Component{
    constructor(props){
        super(props);
        let list = this.props.information;
        this.state = {
            columns: [],
            rows: []
        }
    }

    renderInfo(){
        this.state.rows = rows;
        let keys = Object.keys(rows[0]).slice(2);
        list.map(inf => {
            rows.push(
                <tr>
                    {() => {
                        
                    }}
                </tr>
            );
        });
    }

    makeCell(obj){
        return obj.map(ill => {
            <td></td>
        });
    }

    getColumns(){

    }

    render(){
        return(
            <table></table>
        );
    };
}

export default TestTable;