import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from '../actions';

import { debounce } from 'underscore';

import './autocomplete.css';


class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
    }

    componentWillMount() {
        this.delayedFetchMatches = debounce(() => {
            this.props.fetchMatches(this.state.searchTerm);
        }, 1000);
    }

    componentDidMount() {
        this.count = -1;
    }

    handleChange(value) {
        if(!value) {
            this.setState({ searchTerm: '' });
            let ulElt = document.getElementById('ulList');
            while(ulElt.firstChild) {
                ulElt.removeChild(ulElt.firstChild);
            }
            return;
        }
        this.setState({ searchTerm: value });
        this.delayedFetchMatches();
        this.count = -1;

        // TODO: Wait for a few seconds before sending request (done)
        // TODO: Whenever the search string is updated, clear dropdown, issue another request & load those results into dropdown
    }

    handleKeyDown(event) {
        let liCollection = document.getElementById('ulList').getElementsByTagName('li');
        this.liNodesArray = Array.prototype.slice.call(liCollection, 0);

        if (event.keyCode === 38) { // On key up
            this.count = this.count - 1;
            for (let i = 0; i < this.liNodesArray.length; i++) {
                this.liNodesArray[i].classList.remove('selected');
            }

            var idx = (this.count % this.liNodesArray.length + this.liNodesArray.length) % this.liNodesArray.length;
            this.liNodesArray[idx].classList.add('selected');
            let val = this.liNodesArray[idx].getAttribute('value');
            this.setState({ searchTerm: val });
        } else if (event.keyCode === 40) { // On key down
            this.count = this.count + 1;
            for (let i = 0; i < this.liNodesArray.length; i++) {
                this.liNodesArray[i].classList.remove('selected');
            }
            var idx = (this.count % this.liNodesArray.length + this.liNodesArray.length) % this.liNodesArray.length;
            this.liNodesArray[idx].classList.add('selected');
            let val = this.liNodesArray[idx].getAttribute('value');
            this.setState({ searchTerm: val });
        }
    }

    render() {
        return (
            <div id='main-content'>
                <input
                    id='txt-box-search'
                    type='text'
                    placeholder='Enter your search term'
                    onChange={(e) => this.handleChange(e.target.value)}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                    value={this.state.searchTerm}
                />
                <br />
                {this.props.isFetchingMatches &&
                    <div>Loading matches...</div>
                }
                {!this.props.isFetchingMatches &&
                    <div id='list'>
                        <ul id='ulList'>
                            {this.props.matches.map(match => {
                                return (<li key={match} value={match}><a href='#'>{match}</a></li>)
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMatches: (stringToMatch) => dispatch(actions.fetchMatches(stringToMatch))
    }
};

const mapStateToProps = (state) => {
    const { stringToMatch, isFetchingMatches, matches } = state;
    return {
        stringToMatch,
        isFetchingMatches,
        matches
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);