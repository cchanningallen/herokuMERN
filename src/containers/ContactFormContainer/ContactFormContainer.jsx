import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ContactForm from 'components/organisms/ContactForm';

const addContact = gql`
  mutation addContact {
    addContact(data: { firstName: "C", lastName: "A", email: "c@a.com" }) {
      _id, firstName, lastName, email
    }
  }
`;

const addContactOpts = {
  props({ ownProps, mutate }) {
    return {
      createContact() {
        return mutate({
          variables: {},
          optimisticResponse: {
            __typename: "Mutation",
            addContact: {
              __typename: "Contact",
              _id: "454",
              firstName: "C",
              lastName: "A",
              email: "c@a.com"
            }
          },
          updateQueries: {
            ContactsQuery: (prev, { mutationResult }) => {
              const newContact = mutationResult.data.addContact;
              console.log({prev, newContact});
              return { ...prev, contacts: [...prev.contacts, newContact]};
            }
          }
        })
      }
    }
  }
};

@graphql(addContact, addContactOpts)
class ContactFormContainer extends PureComponent {
  static propTypes = {
    createContact: PropTypes.func.isRequired
  };

  render() {
    return <ContactForm onCreate={this.props.createContact} />
  }
}

export default connect(null, { addContact })(ContactFormContainer);
