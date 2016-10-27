import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

import { contactInputType, contactType } from '../types/contact.js';
import ContactModel from '../../models/contact';

const addContact = {
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(contactInputType)
    }
  },
  async resolve (root, params, options) {
    const contactModel = new ContactModel(params.data);
    const newContact = await contactModel.save();

    if (!newContact) {
      throw new Error('Error adding new contact');
    }

    return newContact;
  },
  type: contactType
};

const removeContact = {
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, params, options) {
    const removedContact = await ContactModel.findByIdAndRemove(params._id);

    if (!removedContact) {
      throw new Error('Error removing contact');
    }

    return removedContact;
  },
  type: contactType
};

export default {
  addContact,
  removeContact
}
