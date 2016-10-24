import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'lib/redux';
import Home from 'pages/Home';

import './theme/yeti.styl';
import './theme/main.scss';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById('root')
);
