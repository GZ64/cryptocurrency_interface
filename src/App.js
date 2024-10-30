import React, {Component} from 'react';
import './css/Grid.css';
import './css/App.css';
import Box from './components/Box';
import Bar from './components/Bar';

import {connect} from "./react-redux/react-redux";
import {getCryptoAll} from './actions/Cryptocurrency';

const mapDispatchToProps = dispatch => {
    return {
        onGetCryptoAll: () => {
            dispatch(getCryptoAll());
        }
    };
};
const mapStateToProps = (state) => ({
    cryptos: state.cryptoAllReducer.cryptos,
});

// valeurs des champs du tableau
const label = [
    'Name',
    'Market Cap',
    'Price',
    'Volume (24h)',
    'Circulating Supply',
    'Change (24h)'
];

let cryptosSortArray = [];

const scrollTo = (element, duration) => {
    let e = document.documentElement;
    if(e.scrollTop===0){
        let t = e.scrollTop;
        ++e.scrollTop;
        e = t+1===e.scrollTop--?e:document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
};

const scrollToC = (element, from, to, duration) => {
    if (duration < 0) return;
    if(typeof from === "object")from=from.offsetTop;
    if(typeof to === "object")to=to.offsetTop;
    scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
};

const scrollToX = (element, x1, x2, t, v, step, operacion) => {
    if (t < 0 || t > 1 || v <= 0) return;
    element.scrollTop = x1 - (x1-x2)*operacion(t);
    t += v * step;
    setTimeout(function() {
        scrollToX(element, x1, x2, t, v, step, operacion);
    }, step);
};

const easeOutCuaic = (t) => {
    t--;
    return t*t*t+1;
};

const renderBox = (cryptos) => {
    return cryptos.length > 0 && (cryptos.map((item, index) => {
        let marketCap;
        let price;
        let volume;
        let percentChange;
        let color = index % 2 ? "#8CD790" : "#77AF9C"; // on alterne les couleurs pour le tableau
        let currency = "";
console.log('item', item.quote?.USD);

        if(item.quote?.USD) {
            currency = 'USD';
        }
        for (item.quote in item.quotes) {
            switch (item.quote) {
                case 'USD':
                    currency = 'USD';
                    break;
                case 'EUR':
                    currency = 'EUR';
                    break;
                case 'BTC':
                    currency = 'BTC';
                    break;
                case 'LTC':
                    currency = 'LTC';
                    break;
                default:
                    break;
            }
            marketCap = item.quotes[item.quote].market_cap;
            price = item.quotes[item.quote].price;
            volume = item.quotes[item.quote].volume_24h;
            percentChange = item.quotes[item.quote].percent_change_24h;
        }
        console.log('currency', currency);
        let formatedMarketCap = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: currency
        }).format(marketCap);
        let formatedPrice = new Intl.NumberFormat('de-DE', {style: 'currency', currency: currency}).format(price);
        let formatedVolume = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: currency
        }).format(volume);
        return <Box
            idCrypto={item.id}
            name={item.name}
            marketCap={formatedMarketCap}
            price={formatedPrice}
            volume={formatedVolume}
            circulatingSupply={item.circulating_supply}
            percentChange={percentChange}
            color={color}
            index={index + 1}
            symbol={item.symbol}
            key={index}
        />;
    }))
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: '' // etat du tri ascendant
        };
        // on recupere la liste des crypto monnaies
        this.props.onGetCryptoAll();
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            window.onscroll = function(ev) {
                document.getElementById("cRetour").className = (window.pageYOffset > 100) ? "cVisible" : "cInvisible";
            };

            var aLiens = document.querySelectorAll('a[href*="#"]');
            for(var i=0, len = aLiens.length; i<len; i++) {
                aLiens[i].onclick = function () {
                    if (window.location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && window.location.hostname === this.hostname) {
                        var target = this.getAttribute("href").slice(1);
                        if (target.length) {
                            scrollTo(document.getElementById(target).offsetTop, 1000);
                            return false;
                        }
                    }
                };
            }
        });
    }

    handleClickSort = () => {
        this.setState({sort: this.state.sort === 'ASC' || this.state.sort === '' ? 'DESC' : 'ASC'});
        cryptosSortArray = this.props.cryptos.reverse(); // toggle du tableau
    };

    render() {
        const {cryptos} = this.props;

        let cryptosSort = "";

        if (cryptosSortArray.length > 0) {
            cryptosSort = cryptosSortArray;
            cryptosSortArray = [];
        } else {
            cryptosSort = cryptos;
        }
        return (
            <div className="App" id="haut">
                <header>
                    <h1>Cryptocurrencies</h1>
                    <h1>{}</h1>
                </header>
                <Bar
                    label={label}
                    handleClickSort={this.handleClickSort}
                />
                <div className="container">
                    {renderBox(cryptosSort)}
                </div>
                <div><a id="cRetour" className="cInvisible" href="#haut"> </a></div>
            </div>
        );
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(App);