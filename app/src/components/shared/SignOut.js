import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {

    componentDidMount() {
        this.props.signout(()=> {
            this.props.history.push('/');  
        });
    }

    render() {
        return (
            <div>
              Adios amigo!
            </div>
        );
    }
}


export default connect(null, actions)(SignOut);