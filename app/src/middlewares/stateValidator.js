import tv4 from 'tv4';

export default ({ dispatch, getState}) => next => action => {

    next(action);
    // tv4.validate(getState(), stateSchema);


}