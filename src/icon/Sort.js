import React from 'react';
import PropTypes from 'prop-types';
import '../css/Sort.css'
import Glass from "./Glass";

const Sort = (props) => (
    <div className="sort" onClick={props.handleClickSort}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    </div>
);

Glass.propTypes = {
    handleClickSort: PropTypes.func
};

export default Sort;