import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArrowBack from '../icon/ArrowBack';

import Autosuggest from "react-autosuggest";
import {connect} from "../react-redux/react-redux";
import {getCryptoAll} from "../actions/Cryptocurrency";
import {Toolbar} from "../actions/Toolbar";

// tableau contenant les suggestions
const dataAutoComplete = [];

const mapDispatchToProps = dispatch => {
    return {
        onGetCryptoAll: (id, params) => {
            dispatch(getCryptoAll(id, params));
        },
        onSearch: (value) => {
            dispatch(Toolbar(value));
        }
    };
};

const mapStateToProps = (state) => ({
    cryptos: state.cryptoAllReducer.cryptos,
    valueInputSearch: state.valueSearchReducer.valueInputSearch,
    limit: state.valueSearchReducer.limit,
    currency: state.valueSearchReducer.currency
});

// formatage des valeurs.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : dataAutoComplete.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

// rendu des suggestions
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class BarSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        };
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    onChange = (event, {newValue}) => {
        if (newValue === "") this.props.onGetCryptoAll('', {
            limitBy: this.props.limit,
            convertCurrency: this.props.currency
        }); // on requete une nouvelle fois avec le filtre
        this.props.onSearch(newValue);
    };

    onSuggestionSelected(event, {suggestion}) {
        this.props.onGetCryptoAll(suggestion.id, {convertCurrency: this.props.currency});
    }

    // fonction mettant a jours les suggestions.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // fonction qui reset les suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const {suggestions} = this.state;
        const {handleClickBack, valueInputSearch} = this.props;

        this.props.cryptos.map((item, index) => {
            let isInArray = false;
            for (let data in dataAutoComplete[index]) {
                if (data === 'name') {
                    if (dataAutoComplete[index][data] === item.name) isInArray = true;
                }
            }
            if (!isInArray) dataAutoComplete.push(item);
            return '';
        });

        // proprietes pour le champs input de l'autocomplete
        const inputProps = {
            value: valueInputSearch,
            onChange: this.onChange,
            id: 'autosuggest',
        };
        return (
            <div className="barsearch-bloc">
                <div className="container">
                    <div className="row">
                        <div className="col s1 offset-l2 arrow-container">
                            <ArrowBack
                                handleClickBack={handleClickBack}
                            />
                        </div>
                        <div className="col s8 m4">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                onSuggestionSelected={this.onSuggestionSelected}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BarSearch.propTypes = {
    handleClickBack: PropTypes.func,
    valueInputSearch: PropTypes.string
};

export default connect(mapDispatchToProps, mapStateToProps)(BarSearch);