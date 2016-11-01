import { List } from 'immutable';
import uuid from 'node-uuid';
import { combineReducers } from 'redux';
import api from 'lib/util/api';

// Action Types
const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const REQUEST_CONTACTS = 'REQUEST_CONTACTS';
const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';


// Action Creators
export const addContact = (params) => {
  return { type: ADD_CONTACT, payload: { params } }
};

export const removeContact = (idx) => {
  return { type: REMOVE_CONTACT, payload: { idx } }
};

export const updateContact = (idx, params) => {
  return { type: UPDATE_CONTACT, payload: { idx, params } }
};

export const fetchContacts = () => (dispatch) => {
  dispatch(requestContacts());

  return getContacts().then(response => {
    console.log({response});
    dispatch(receiveContacts(response))
  })
};

export const requestContacts = () => {
  return { type: REQUEST_CONTACTS }
};

export const receiveContacts = (response) => {
  console.log({response})
  return { type: RECEIVE_CONTACTS, payload: response }
};


// Reducers
const data = (state = List(), { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return state.push({ _id: uuid.v1(), ...payload.params });

    case REMOVE_CONTACT:
      return state.remove(payload.idx);

    case UPDATE_CONTACT:
      return state.update(payload.idx, val => ({ ...val, ...payload.params }));

    case RECEIVE_CONTACTS:
      return List(payload.contacts);

    default:
      return state;
  }
};

const isLoading = (state = false, { type, payload }) => {
  switch (type) {
    case REQUEST_CONTACTS:
      return true;

    case RECEIVE_CONTACTS:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  data,
  isLoading
})

// Selectors
export const getContacts = (state) => state.contacts.data;
export const getContactsLoading = (state) => state.contacts.isLoading;
