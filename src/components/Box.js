import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { API_URL_CRYPTO_IMG } from '../constants/Global';
import Hexagon from '../icon/Hexagon';
import '../css/Box.css';

class Box extends Component {

    render() {
        const {idCrypto, index, name, marketCap, price, volume, circulatingSupply, symbol, percentChange, color} = this.props;

        return (
            <div className="box" style={{backgroundColor: color}}>
                <div className="row">
                    <Hexagon
                        rank={index}
                        color={color}
                    />
                    <div className="col s3 m1 border truncate">{name}</div>
                    <div className="col s3 m3 border truncate">{marketCap}</div>
                    <div className="col s3 m2 border truncate">{price}</div>
                    <div className="col m3 border truncate">{volume}</div>
                    <div className="col m2 border truncate"><nobr>{circulatingSupply + ' ' + symbol}</nobr></div>
                    <div className="col s3 m1 border truncate">{percentChange}%</div>
                </div>
                <div className="triangle-left" style={{borderColor: 'transparent transparent transparent ' + color}}>
                    <img alt="logo_crypto_currency" className="logo-crypto" src={ API_URL_CRYPTO_IMG + idCrypto + ".png"} />
                </div>
                <div className="triangle-right" style={{borderColor: 'transparent transparent transparent ' + color}}>

                </div>
            </div>
        );
    }
}

Box.propTypes = {
    idCrypto: PropTypes.number,
    name: PropTypes.string,
    marketCap: PropTypes.string,
    price: PropTypes.string,
    volume: PropTypes.string,
    circulatingSupply: PropTypes.number,
    percentChange: PropTypes.number,
    color: PropTypes.string,
    index: PropTypes.number,
    symbol: PropTypes.string
};

export default Box;