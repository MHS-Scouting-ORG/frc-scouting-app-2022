import React from "react";
import { useTable, useSortBy } from "react-table";

class TestTable extends React.Component{
    constructor(props){
        super(props);
        this.getInfo = this.getInfo.bind(this);

        this.state = {
            data: [],
            columns: [],
            rows: "",
        }
    }

    getInfo(){
        let info = this.props.information;
        let keys = Object.keys(info[0]).slice(2);

        let rows = info.map(input => {

            let values = info.map(obj => {
                let cells = keys.map(key => obj.key);
            });

            return (
                <tr key={input.TeamName}>{input}</tr>
            );
            
        });
        this.setState({
            data: info,
            columns: keys
        });
    }

    render(){

        return(
            <table>
                <thead>
                    <tr>
                        {this.state.columns.map(key => '<th>{key}</th>')}
                    </tr>
                </thead>
            </table>
        );
    };
}

export default TestTable;