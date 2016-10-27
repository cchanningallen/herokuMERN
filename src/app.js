import './theme/yeti.styl';
import './theme/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface, addTypeName } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import contactsReducer from 'lib/redux/contacts';
import Home from 'pages/Home';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const client = new ApolloClient({
  networkInterface: createNetworkInterface('/graphql'),
  queryTransformer: addTypeName
});

const store = createStore(
  combineReducers({
    contacts: contactsReducer,
    apollo: client.reducer()
  }),
  {},
  composeEnhancers(applyMiddleware(client.middleware()))
);

render(
  <ApolloProvider {...{store, client}}>
    <Home/>
  </ApolloProvider>,
  document.getElementById('root')
);
