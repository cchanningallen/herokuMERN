import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import {
  getContacts,
  getContactsLoading,
  fetchContacts,
  removeContact
} from 'lib/redux/contacts';
import ContactsList from 'components/organisms/ContactsList';

class ContactsListContainer extends PureComponent {
  static propTypes = {
    contacts: PropTypes.instanceOf(List).isRequired,
    removeContact: PropTypes.func.isRequired,
    fetchContacts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { contacts, isLoading, removeContact } = this.props;
    return <ContactsList {...{contacts, isLoading, removeContact}} />
  }
}

const mapState = (state) => ({
  contacts: getContacts(state),
  isLoading: getContactsLoading(state)
});
const mapDispatch = { removeContact, fetchContacts };

export default connect(mapState, mapDispatch)(ContactsListContainer);
