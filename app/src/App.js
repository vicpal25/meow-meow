
import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';

import { Route, BrowserRouter, PrivateRoute } from 'react-router-dom';
import './styles/App.css';
import NavDrawer from './components/shared/NavDrawer';
import SignIn from './components/shared/SignIn';
import SignOut from './components/shared/SignOut';

import requireAuth from './components/shared/RequireAuth';

//Private Components
import Meow from './components/private/Meow';
import JPKittens from './components/private/sections/JPKittens';
import GifKittens from './components/private/sections/GifKittens';
import FavKittens from './components/private/sections/FavKittens';

import { createStore, applyMiddleware } from 'redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'draft-js/dist/Draft.css';

const theme = createMuiTheme({
  typography: {
    "fontFamily": "Raleway",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
    },
  palette: {
      secondary: {
          main: '#d32f2f'
      }
    },
});

class App extends Component {

  state = {
    segments: []
}
  render() {

    if(this.props.authenticated) {
      return (
        <MuiThemeProvider theme={theme}>     
            <div className="App">
                <NavDrawer>
                  <Route path="/signout" component={SignOut} />
                  <Route exact path="/" component={Meow} />
                  <Route exact path="/jp" component={JPKittens} />
                  <Route exact path="/g" component={GifKittens} />
                  <Route exact path="/favs" component={FavKittens} />
                </NavDrawer>        
            </div>
        </MuiThemeProvider>
    );
    } else {
      return (<Route path="/" exact component={SignIn} />)
    }

  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App);
