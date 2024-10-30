import { VALUE_SEARCH, LIMIT, CURRENCY } from "../constants/ActionTypes";

const initialState = {
    valueInputSearch: '',
    limit: 100,
    currency: 'USD'
};

export default function valueSearchReducer(state = initialState, action) {
    switch (action.type) {
        case VALUE_SEARCH:
            return {
                ...state,
                valueInputSearch: action.payload
            };
        case LIMIT:
            return {
                ...state,
                limit: action.payload
            };
        case CURRENCY:
            return {
                ...state,
                currency: action.payload
            };
        default:
            return state;
    }
}