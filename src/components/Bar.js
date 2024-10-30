import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/Bar.css';
import Glass from '../icon/Glass';
import Sort from '../icon/Sort';
import BarSearch from './BarSearch';
import Select from '../components/Select';
import ChoiceNumberOfResult from "../components/ChoiceNumberOfResult";

// valeurs du select pour la conversion
const itemSelectCurrency = [
    'USD',
    'EUR',
    'BTC',
    'LTC'
];

class Bar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFixed: false, // bool pour evaluer l'etat de la toolbar
            lastScrollTop: 0, // pour evaluer le scroll up/down
            barTop: 0, // la position de la toolbar
            isSearch: false // evalue si toolbar/recherche
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll); // listener d'evenement
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll); // suppression
    }

    handleScroll = (e) => { // au scroll
        // scroll down ou up ?
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > this.state.lastScrollTop && !this.state.isSearch) {
            this.setState({barTop: -50}); // down
        } else {
            this.setState({barTop: 0}); // up
        }
        this.setState({lastScrollTop: st <= 0 ? 0 : st}); // on memorise l'etat du scroll
        // on memorise l'etat fixed suivant la position dans la page
        if (e.currentTarget.scrollY >= 150) this.setState({isFixed: true});
        else this.setState({isFixed: false});
    };
    handleClickGlass = () => {
        this.setState({isSearch: true}); // on memorise l'etat recherche au click de l'icon loupe
    };
    handleClickBack = () => {
        this.setState({isSearch: false}); // on memorise l'etat recherche au click de l'icon retour
    };

    render() {
        const {isFixed, barTop, isSearch} = this.state;
        const {label, handleClickSort} = this.props;

        return (
            <div className="bar-bloc" onScroll={this.handleScroll}
                 style={{position: isFixed ? 'fixed' : 'inherit', top: barTop}}>
                <div>
                    <div id="bar-top">
                        {!isSearch && (
                            <div className="container">
                                <div className="row">
                                    <div className="col s2 m1 l1 offset-l2">
                                        <Glass
                                            onClick={this.handleClickGlass}
                                        />
                                    </div>
                                    <div className="col s2 m1 l1">
                                        <Sort handleClickSort={handleClickSort} />
                                    </div>
                                    <div className="col s4 m5 l3">
                                        <Select
                                            itemSelectCurrency={itemSelectCurrency}
                                        />
                                    </div>
                                    <div className="col s4 m5 l4">
                                        <ChoiceNumberOfResult
                                            name="filterResults"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {isSearch && (
                            <BarSearch
                                handleClickBack={this.handleClickBack}
                            />
                        )}
                    </div>
                    <div id="bar-bottom" className="container">
                        <div className="row">
                            <div className="col s3 m1 truncate border">{label[0]}</div>
                            <div className="col s3 m3 truncate border">
                                <nobr>{label[1]}</nobr>
                            </div>
                            <div className="col s3 m2 truncate border">{label[2]}</div>
                            <div className="col m3 truncate border">
                                <nobr>{label[3]}</nobr>
                            </div>
                            <div className="col m2 truncate border">
                                <nobr>{label[4]}</nobr>
                            </div>
                            <div className="col s3 m1 truncate border">
                                <nobr>{label[5]}</nobr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Bar.propTypes = {
    label: PropTypes.array,
    handleClickSort: PropTypes.func
};

export default Bar;