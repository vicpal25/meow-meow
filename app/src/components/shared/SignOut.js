import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Cookies from 'js-cookie';

class SignOut extends Component {

    componentDidMount() {
        this.props.signout(()=> {
            Cookies.remove('user');
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