import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import {createStore,applyMiddleware} from 'redux';

const store = createStore(reducers,{},applyMiddleware(reduxThunk))

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
