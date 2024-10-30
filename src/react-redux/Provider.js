import React from "react";
import PropTypes from "prop-types";

class Provider extends React.Component {
    //Création du context
    getChildContext = () => {
        return { store: this.props.store };
    }
    render() {
        return this.props.children;
    }
};

Provider.childContextTypes = {
    store: PropTypes.object,
};

export default Provider;