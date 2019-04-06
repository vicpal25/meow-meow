import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import async from './middlewares/async';
import stateValidtor from './middlewares/stateValidator';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

export default ({ children, initialState = {} }) => {

  const store = createStore(
    reducers,
    
    {
      auth: { authenticated : localStorage.getItem('token') }
    },
    applyMiddleware(async, stateValidtor, reduxThunk)
  );

  return <Provider store={store}>{children}</Provider>;
};
