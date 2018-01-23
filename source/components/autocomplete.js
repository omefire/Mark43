import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

import { debounce } from 'underscore';

import './autocomplete.css';


class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    componentWillMount() {
        this.delayedFetchMatches = debounce(() => {
            this.props.fetchMatches(this.state.searchTerm);
        }, 1000);
    }

    handleChange(value) {
        this.setState({ searchTerm: value });
        this.delayedFetchMatches();

        // TODO: Wait for a few seconds before sending request (done)
        // TODO: Whenever the search string is updated, clear dropdown, issue another request & load those results into dropdown
    }

    render() {
        return (
            <div id='main-content'>
                <input
                    id='txt-box-search'
                    style={mainStlye}
                    type='text'
                    placeholder=''
                    onChange={(e) => this.handleChange(e.target.value)}
                    value={this.state.searchTerm}
                />
                <br />
                {this.props.isFetchingMatches &&
                    <div>Loading matches...</div>
                }
                {!this.props.isFetchingMatches &&
                    <div id='list'>
                        <ul>
                            <li><a href='#'>Small</a></li>
                            <li><a href='#'>Medium</a></li>
                            <li><a href='#'>Large</a></li>
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

const mainStlye = {
    position: 'absolute',
    top: 0,
    left: 0,
    'zIndex': 11,
    background: 'transparent',
};