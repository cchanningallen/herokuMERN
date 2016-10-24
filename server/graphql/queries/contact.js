import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import { contactType } from '../types/contact';
import ContactModel from '../../models/contact';

const contact = {
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    return ContactModel.findById(params.id);
  },
  type: contactType
};

const contacts = {
  args: {},
  resolve (root, params, options) {
    return ContactModel.find();
  },
  type: new GraphQLList(contactType)
};

export default {
  contact,
  contacts
};
