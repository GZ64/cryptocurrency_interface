import {
    GET_CRYPTO_SUCCESS,
    GET_CRYPTO_FAILURE,
    GET_CRYPTO_STARTED
} from '../constants/ActionTypes';

const initialState = {
    loading: false,
    cryptos: [],
    error: null
};

export default function cryptoAllReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CRYPTO_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_CRYPTO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cryptos: action.payload
            };
        case GET_CRYPTO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}