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
        let liCollection = document.getElementById('ulList').getElementsByTagName('li');
        this.liNodesArray = Array.prototype.slice.call(liCollection, 0);
        this.count = -1;
    }

    componentDidUpdate() {
        //let liCollection = document.getElementById('ulList').getElementsByTagName('li');
        //this.liNodesArray = Array.prototype.slice.call(liCollection, 0);
        this.count = -1;
    }

    handleChange(value) {
        this.setState({ searchTerm: value });
        this.delayedFetchMatches();

        // TODO: Wait for a few seconds before sending request (done)
        // TODO: Whenever the search string is updated, clear dropdown, issue another request & load those results into dropdown
    }

    handleKeyDown(event) {

        // On first display of the page, there's no names to walk through
        if (this.liNodesArray.length === 0) {
            return;
        }

        if (event.keyCode === 38) { // On key up
            //this.setState({ count: this.state.count - 1 });
            this.count = this.count - 1;
            for (let i = 0; i < this.liNodesArray.length; i++) {
                this.liNodesArray[i].classList.remove('selected');
            }

            //let idx = this.count % this.liNodesArray.length;
            var idx = (this.count % this.liNodesArray.length + this.liNodesArray.length) % this.liNodesArray.length;
            //console.log(`idx: ${idx}, count: ${this.count}, array length: ${this.liNodesArray.length}`);
            this.liNodesArray[idx].classList.add('selected');
            var a = 2;
        } else if (event.keyCode === 40) { // On key down
            //this.setState({ count: this.state.count + 1 });
            this.count = this.count + 1;
            for (let i = 0; i < this.liNodesArray.length; i++) {
                this.liNodesArray[i].classList.remove('selected');
            }
            //let idx = this.count % this.liNodesArray.length;
            var idx = (this.count % this.liNodesArray.length + this.liNodesArray.length) % this.liNodesArray.length;
            //console.log(`idx: ${idx}, count: ${this.count}, array length: ${this.liNodesArray.length}`);
            this.liNodesArray[idx].classList.add('selected');
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
                                return (<li key={match}><a href='#'>{match}</a></li>)
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