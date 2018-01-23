import './styles/main.css';
import './scripts/example';

import AutoComplete from './components/autocomplete';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';

const initialState = {
    stringToMatch: '', 
    isFetchingMatches: false, 
    matches: []
};
const store = createStore(
    reducer, 
    initialState, 
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <AutoComplete />
    </Provider>,
    document.getElementById('content')
);
