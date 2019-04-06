import axios from 'axios';
import {
  CHANGE_AUTH,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_IMAGES
} from './types';


const DEV_API = 'http://localhost:3090';

export function changeAuth(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export const signup = (formProps, callback) => async dispatch => {

  try {

    const response = await axios.post(DEV_API + '/signup', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem('token', response.data.token);

    callback();

  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'EMAIL_IN_USE'
    })

  }

};
export const signin = (formProps, callback) => async dispatch => {

  try {

    const response = await axios.post('http://localhost:3090/signin', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem('token', response.data.token);

    callback();

  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid Email Creds'
    })

  }

};

export const signout = (callback) => {

  localStorage.removeItem('token');

  callback();

  return {
    type: AUTH_USER,
    payload: ''
  }

}

export async function fetchImages(options) {
  
  let filters = "";

  if(options) {
   filters = filterMimeTypes(options);
  }

  const response = await axios.get(DEV_API + '/images/?mime_types=' + filters + '&limit=20');

  return {
    type: FETCH_IMAGES,
    payload: response
  }
 
}

export async function imageBundle(options) {
  
  let filters = "";

  const response = await axios.get(DEV_API + '/images/bundle');

  return {
    type: FETCH_IMAGES,
    payload: response
  }

 
}

function filterMimeTypes(options) {
  return Object.keys(options).map((item)=> {       
    if(options[item])  {
      return item;
    }
  }).filter(Boolean).join(',')
}
