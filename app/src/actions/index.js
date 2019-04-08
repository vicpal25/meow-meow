import axios from 'axios';
import {
  CHANGE_AUTH,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_IMAGES,
  FETCH_FAVORITES,
  POST_FAVORITES,
  REMOVE_FAVORITES,
  IS_IT_FAVORITE
  
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

export async function fetchFavorites(options) {

  const response = await axios.get(DEV_API + '/favorites/' + options.user);

  return {
    type: FETCH_FAVORITES,
    payload: response
  }
}
export async function addToFavorites(options) {

  const params = {
    "user": options.user,
    "url": options.url
  }

  const response = await axios.post(DEV_API + '/favorites/', params);

  return {
    type: POST_FAVORITES,
    payload: response
  }
}

export async function checkFavorite(options) {

  const response = await axios.get(DEV_API + '/favorites/' + options.user + '/' + encodeURIComponent(options.url));

  return {
    type: IS_IT_FAVORITE,
    payload: response
  }

}

export async function removeFavorite(options) {

  const response = await axios.get(DEV_API + '/favorites/' + options.user + '/' + encodeURIComponent(options.url));

  return {
    type: REMOVE_FAVORITES,
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
