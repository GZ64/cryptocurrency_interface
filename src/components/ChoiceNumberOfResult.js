import React from 'react';
import PropTypes from 'prop-types';
import '../css/ChoiceNumberOfResult.css'

import {connect} from "../react-redux/react-redux";
import {getCryptoAll} from "../actions/Cryptocurrency";
import {Limit} from "../actions/Toolbar";
import Filter from "../icon/Filter";

const mapDispatchToProps = dispatch => {
    return {
        onGetCryptoAll: (id, param) => {
            dispatch(getCryptoAll(id, param));
        },
        onLimit: (value) => {
            dispatch(Limit(value));
        }
    };
};

const mapStateToProps = (state) => ({
    limit: state.valueSearchReducer.limit,
    currency: state.valueSearchReducer.currency
});

class ChoiceNumberOfResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 100,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({value: this.filter.value});
        let param = {
            limitBy: this.filter.value,
            convertCurrency: this.props.currency
        };
        this.props.onGetCryptoAll('', param);
    };
    onChange = e => {
        this.setState({value: e.currentTarget.value});
        this.props.onLimit(e.currentTarget.value);
    };

    componentDidMount() {
        this.setState({value: this.props.limit})
    }

    componentWillUnmount() {
        this.props.onLimit(this.state.value);
    }

    render() {
        const {value} = this.state;
        const {name} = this.props;
        return (
            <form className="form-filter row" onSubmit={e => this.handleSubmit(e)}>
                <label className="col m3">Filter:</label>
                <input className="col s8 m6" type="tel" name={name} value={value} onChange={this.onChange}
                       ref={input => this.filter = input}/>
                <button className="col s4 m2" type="submit" name="submit"><Filter/></button>
            </form>
        );
    }
}

ChoiceNumberOfResult.propTypes = {
    name: PropTypes.string
};

export default connect(mapDispatchToProps, mapStateToProps)(ChoiceNumberOfResult);