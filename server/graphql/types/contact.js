import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const sharedFields = {
  firstName: {
    type: GraphQLString
  },
  lastName: {
    type: GraphQLString
  },
  email: {
    type: GraphQLString
  }
};

export const contactType = new GraphQLObjectType({
  name: "Contact",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...sharedFields
  }
});

export const contactInputType = new GraphQLInputObjectType({
  name: "ContactInput",
  fields: {
    _id: {
      type: GraphQLID
    },
    ...sharedFields
  }
});

export default {
  contactType,
  contactInputType
}
