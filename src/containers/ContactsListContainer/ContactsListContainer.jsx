import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { reject, propEq } from 'ramda';

import { getContacts } from 'lib/redux/contacts';
import ContactsList from 'components/organisms/ContactsList';

const ContactsQuery = gql`
  query ContactsQuery {
    contacts {
      _id,
      firstName,
      lastName,
      email
    }
  }
`;

const removeContact = gql`
  mutation removeContact($_id: ID!) { 
    removeContact(_id: $_id) {
      _id
    }
  }
`;

const removeContactOpts = {
  props({ ownProps, mutate }) {
    return {
      deleteContact(_id) {
        return mutate({
          variables: { _id },
          optimisticResponse: {
            __typename: "Mutation",
            removeContact: {
              __typename: "Contact",
              _id
            }
          },
          updateQueries: {
            ContactsQuery: (prev, { mutationResult }) => {
              const removedId = mutationResult.data.removeContact._id;
              const newContacts = reject(propEq('_id', removedId))(prev.contacts);
              return { ...prev, contacts: newContacts };
            }
          }
        })
      }
    }
  }
};


@graphql(ContactsQuery)
@graphql(removeContact, removeContactOpts)
class ContactsListContainer extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      contacts: PropTypes.array,
    }).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    deleteContact: PropTypes.func.isRequired
  };

  render() {
    const { data: { loading, contacts }, deleteContact } = this.props;
    return <ContactsList {...{loading, deleteContact, contacts}} />
  }
}

const mapStateToProps = (state) => ({
  contacts: getContacts(state)
});

export default connect(
  mapStateToProps
)(ContactsListContainer);
