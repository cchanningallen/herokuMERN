import './ContactsList.scss';

import React, {PropTypes, PureComponent} from 'react';
import { List } from 'immutable';
import ContactCard from 'components/molecules/ContactCard';

class ContactsList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    removeContact: PropTypes.func.isRequired,
    contacts: PropTypes.instanceOf(List).isRequired
  };

  contactsList(contacts, onDelete) {
    if (contacts.size > 0) {
      return(
        <div className="Home__contacts-list">
          {contacts.map((props, key) => {
            console.log(props, key);
            return <ContactCard idx={key} {...props} {...{key, onDelete}} />
          })}
        </div>
      )
    } else {
      return 'You have no contacts. Add one!'
    }
  }

  render() {
    const { isLoading, contacts, removeContact } = this.props;

    return (
      <div className="ContactsList">
        {isLoading ? 'Loading...' : null}
        {contacts ? this.contactsList(contacts, removeContact) : null}
      </div>
    );
  }
}

export default ContactsList;
