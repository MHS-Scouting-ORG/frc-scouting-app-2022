import React from 'react';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.changeReadOnly = this.changeReadOnly.bind(this);
        this.changeText = this.changeText.bind(this);
        this.state = {
            readOnly: true,
            text: '',
        };
    }

    changeReadOnly(){
        this.setState({readOnly: !this.state.readOnly});
    }

    changeText(e){
        console.log(e.target.value)
        this.setState({text: e.target.value});
        this.props.setValue(e.target.value);
    }

    render(){
        return (
            <div>
                <button
                    style={{
                        color: 'black',
                        borderRadius: '8px',
                        fontSize: '12px'
                    }}
                    onClick={this.changeReadOnly}
                > {this.state.readOnly ? 'Edit' : 'Done'} </button>
                {/*<input
                    readOnly={this.state.readOnly}
                    style={{
                        border: '2px solid #008CBA',
                        color: 'black',
                        borderRadius: '8px',
                        wordWrap: 'break-word'
                    }}
                ></input>*/}
                <p contentEditable={!this.state.readOnly} 
                    style={{
                        maxWidth:'350px',
                        wordWrap: 'break-word',
                        border: !this.state.readOnly ? '1px solid black' : '',
                        borderRadius: '8px',
                    }}
                    onChange={this.changeText}
                ></p>
            </div>
        )
    }
}

export default Comment;