import React from "react";
import Checkbox from "./Checkbox";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.addOnColumnSort = this.addOnColumnSort.bind(this);
        this.state = { list: ["", "", "", "", ""] };
    }

    addOnColumnSort(bool, value, id){
        let checkboxState = this.state.list;

        if (bool === true) {
            checkboxState[id] = value
        } else {
            checkboxState[id] = ""
        }

        this.props.setList(checkboxState);
    }

    render() {
        return (
            <div>
                <Checkbox value="Low Hub Shooter" changeState={this.addOnColumnSort} id={0}/>
                <Checkbox value="Accurate Low Hub Shooter" changeState={this.addOnColumnSort} id={1}/>
                <Checkbox value="Upper Hub Shooter" changeState={this.addOnColumnSort} id={2}/>
                <Checkbox value="Accurate Upper Hub Shooter" changeState={this.addOnColumnSort} id={3}/>
                <Checkbox value="Hangar" changeState={this.addOnColumnSort} id={4}/>
            </div>
        )
    }


}

export default List;