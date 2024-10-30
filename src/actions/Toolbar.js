import {
    VALUE_SEARCH,
    LIMIT,
    CURRENCY
} from '../constants/ActionTypes'


export const Toolbar = value => {
    return (dispatch, getState) => {
        dispatch(valueSearch(value));
        console.log('current state:', getState());
    };
};

export const Limit = value => {
    return (dispatch, getState) => {
        dispatch(valueLimit(value));
        console.log('current state:', getState());
    };
};

export const Currency = value => {
    return (dispatch, getState) => {
        dispatch(valueCurrency(value));
        console.log('current state:', getState());
    };
};

const valueSearch = value => ({
    type: VALUE_SEARCH,
    payload: value
});

const valueLimit = value => ({
    type: LIMIT,
    payload: value
});

const valueCurrency = value => ({
    type: CURRENCY,
    payload: value
});