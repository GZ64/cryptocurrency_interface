import {
    GET_CRYPTO_SUCCESS,
    GET_CRYPTO_FAILURE,
    GET_CRYPTO_STARTED
} from '../constants/ActionTypes'
import {
    PROXY_URL,
    API_URL,
    PARAM_API_URL_ARRAY,
    PARAM_API_URL_CONVERT_EUR,
    PARAM_API_URL_CONVERT_BTC,
    PARAM_API_URL_CONVERT_LTC,
    PARAM_API_URL_LIMIT_BY
} from '../constants/Global';

export const getCryptoAll = (id = 0, params) => {
    let optionsConvert = "";
    let limitBy = "";
    if (typeof params !== 'undefined') {
        switch (params.convertCurrency) {
            case 'EUR':
                optionsConvert = PARAM_API_URL_CONVERT_EUR;
                break;
            case 'BTC':
                optionsConvert = PARAM_API_URL_CONVERT_BTC;
                break;
            case 'LTC':
                optionsConvert = PARAM_API_URL_CONVERT_LTC;
                break;
            default:
                optionsConvert = "";
                break;
        }
        limitBy = PARAM_API_URL_LIMIT_BY + params.limitBy;
    }

    // if (param.limitBy != null && param.limitBy !== 'undefined') params = PARAM_API_URL_LIMIT_BY;
    let idCrypto = id === 0 ? "" : "/" + id + "/";

    return (dispatch, getState) => {
        dispatch(getCryptoAllStarted());
        console.log('PROXY_URL + API_URL + idCrypto + PARAM_API_URL_ARRAY + params', PROXY_URL + API_URL + idCrypto + PARAM_API_URL_ARRAY + optionsConvert + limitBy);
        const myHeaders = new Headers();
        myHeaders.append("X-CMC_PRO_API_KEY", "83dd649d-749b-48bd-99d6-6904d25041d5");
        fetch(PROXY_URL + API_URL, {
            headers: myHeaders
        })
            .then(function(response) {
                // console.log('response', response.json());
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(result => {
                console.log('result', result.data);
                dispatch(getCryptoSuccess(result.data));
                console.log('current state:', getState());

            })
            .catch(error => {
                console.error(error);
                dispatch(getCryptoAllFailure(error.message));
            });
    };
};

const getCryptoSuccess = cryptos => ({
    type: GET_CRYPTO_SUCCESS,
    payload: cryptos
});

const getCryptoAllStarted = () => ({
    type: GET_CRYPTO_STARTED
});

const getCryptoAllFailure = error => ({
    type: GET_CRYPTO_FAILURE,
    payload: {
        error
    }
});