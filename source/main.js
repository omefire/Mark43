import './styles/main.css';
import './scripts/example';

import AutoComplete from './components/autocomplete';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <AutoComplete />
    </Provider>,
    document.getElementById('content')
);
