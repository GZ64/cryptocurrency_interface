import { combineReducers } from 'redux';

import cryptoAllReducer from './Cryptocurrency';
import valueSearchReducer from './Search';


export default combineReducers({
    cryptoAllReducer,
    valueSearchReducer
})