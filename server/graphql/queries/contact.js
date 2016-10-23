import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import { contactType } from '../types/contact';
import ContactModel from '../../models/contact';

const contact = {
  type: contactType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    return ContactModel.findById(params.id);
  }
};

const contacts = {
  type: new GraphQLList(contactType),
  args: {},
  resolve (root, params, options) {
    return ContactModel.find();
  }
};

export default {
  contact,
  contacts
};
