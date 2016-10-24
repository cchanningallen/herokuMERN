import { List } from 'immutable';
import uuid from 'node-uuid';

// Action Types
const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';

// Reducer
const SAMPLE_DATA = List([
  { _id: '123', email: 'cchanningallen@gmail.com', firstName: 'Channing', lastName: 'Allen' },
  { _id: '124', email: 'cchanningallen@gmail.com', firstName: 'Channing', lastName: 'Allen' },
  { _id: '125', email: 'cchanningallen@gmail.com', firstName: 'Channing', lastName: 'Allen' },
  { _id: '126', email: 'cchanningallen@gmail.com', firstName: 'Channing', lastName: 'Allen' },
  { _id: '127', email: 'cchanningallen@gmail.com', firstName: 'Channing', lastName: 'Allen' }
]);

// Reducer
export default (state = SAMPLE_DATA, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return state.push({ _id: uuid.v1(), ...payload.params });

    case REMOVE_CONTACT:
      return state.remove(payload.idx);

    case UPDATE_CONTACT:
      return state.update(payload.idx, val => ({ ...val, ...payload.params }))

    default:
      return state;
  }
};

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

// Selectors
export const getContacts = (state) => state.contacts;
