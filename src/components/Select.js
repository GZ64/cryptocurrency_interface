import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/Select.css';

import {connect} from "../react-redux/react-redux";
import {getCryptoAll} from "../actions/Cryptocurrency";
import {Currency} from "../actions/Toolbar";

const mapDispatchToProps = dispatch => {
    return {
        onGetCryptoAll: (id, param) => {
            dispatch(getCryptoAll(id, param));
        },
        onCurrency: (value) => {
            dispatch(Currency(value));
        }
    };
};

const mapStateToProps = (state) => ({
    currency: state.valueSearchReducer.currency,
    limit: state.valueSearchReducer.limit
});


class Select extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let param = {
            convertCurrency: e.target.value,
            limitBy: this.props.limit
        };
        this.props.onCurrency(e.target.value);
        this.props.onGetCryptoAll('', param);
    }

    render() {
        const {itemSelectCurrency, currency} = this.props;
        return (
            <div className="select row">
                <label className="col m4">
                    Convert:
                </label>
                <select className="col s10 m6" value={currency} onChange={this.handleChange}>
                    {itemSelectCurrency.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    itemSelectCurrency: PropTypes.array

};

export default connect(mapDispatchToProps, mapStateToProps)(Select);