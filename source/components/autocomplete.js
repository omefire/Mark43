import React, { Component } from 'react';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label>Enter search term:
                <input name="ac-box" type="text"></input>
            </label>
        );
    }
}