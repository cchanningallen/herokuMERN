import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { getContacts, removeContact } from 'lib/redux/contacts';
import ContactsList from 'components/organisms/ContactsList';

class ContactsListContainer extends PureComponent {
  static propTypes = {
    contacts: PropTypes.instanceOf(List).isRequired,
    removeContact: PropTypes.func.isRequired
  };

  render() {
    return <ContactsList {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  contacts: getContacts(state)
});

export default connect(
  mapStateToProps,
  { removeContact }
)(ContactsListContainer);
