import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'lib/redux';
import Home from 'pages/Home';

import './theme/yeti.styl';
import './theme/main.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const preloadedState = {};

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById('root')
);
