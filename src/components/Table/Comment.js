import React from 'react';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.changeReadOnly = this.changeReadOnly.bind(this);
        this.state = {
            readOnly: true,
        };
    }

    changeReadOnly(){
        console.log(this.state.readOnly)
        this.setState({readOnly: !this.state.readOnly});
    }

    render(){
        return (
            <div>
                <button
                    style={{
                        //border: '2px solid #008CBA',
                        color: 'black',
                        borderRadius: '8px',
                        fontSize: '12px'
                    }}
                    onClick={this.changeReadOnly}
                > Edit </button>
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
                ></p>
            </div>
        )
    }
}

export default Comment;