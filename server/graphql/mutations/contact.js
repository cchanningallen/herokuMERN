import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

import { contactInputType, contactType } from '../types/contact.js';
import ContactModel from '../../models/contact';

const addContact = {
  type: GraphQLID,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(contactInputType)
    }
  },
  async resolve (root, params, options) {
    console.log("hmm")
    const contactModel = new ContactModel(params.data);
    const newContact = await contactModel.save();

    if (!newContact) {
      throw new Error('Error adding new contact');
    }
    
    return newContact._id;
  }
};

const removeContact = {
  type: contactType,
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
  }
};

export default {
  addContact,
  removeContact
}
