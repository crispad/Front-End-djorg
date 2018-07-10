import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Button} from 'reactstrap';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {}
        }

     
    }
    render(){
        return(
            <React.Fragment>
                <div className="Note">
                {(this.state.Redirect) ? (<Redirect to={"/"} />) : ('')}
                <div>
                <Button color="primary" size="sm">Save</Button>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Note;