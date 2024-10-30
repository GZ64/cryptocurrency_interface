import React from 'react';
import PropTypes from 'prop-types';
import '../css/Hexagon.css'

const Hexagon = (props) => (
    <div className="Hexagon">
        {/* la propriete styyle sert a centrer les nombres dans les hexagon */}
        <span className="rank" style={{ left: props.rank.toString().length === 1 ? 20 : props.rank.toString().length === 2 ? 15 : 10 + 'px'}}>{props.rank}</span>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 202.071 202.071" fill={props.color}>
            <path d="M50.518,188.535h101.038l50.515-87.5l-50.515-87.5H50.518L0,101.035L50.518,188.535z M59.178,28.535h83.718l41.854,72.5
	                    l-41.854,72.5H59.178l-41.858-72.5L59.178,28.535z"/>
        </svg>
    </div>
);

Hexagon.propTypes = {
    rank: PropTypes.number,
    color: PropTypes.string
};

export default Hexagon;