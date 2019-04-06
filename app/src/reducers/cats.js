import { FETCH_IMAGES } from '../actions/types';

const initialState = {

}

export default (state = [], action) => {
  switch (action.type) {

  case FETCH_IMAGES:

    const activity = action.payload.data;
    return [...state, activity];


  default:
    return state
  }
}
