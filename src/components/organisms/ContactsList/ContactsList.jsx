import './ContactsList.scss';

import React, {PropTypes, PureComponent} from 'react';
import { List } from 'immutable';
import ContactCard from 'components/molecules/ContactCard';
import cxHelpers from 'lib/decorators/classNameHelpers';
let i = 0;
@cxHelpers
class ContactsList extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    deleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.array
  };

  contactsList(contacts, onDelete) {
    if (contacts && contacts.length > 0) {
      return(
        <div className={this.cxEl('contacts-list')}>
          {contacts.map((props, key) => {
            return <ContactCard {...props} {...{key, onDelete}} />
          })}
        </div>
      )
    } else {
      return 'You have no contacts. Add one!'
    }
  }

  render() {
    console.log(`ContactsList rendered ${i++} times`);
    console.log('ContactsList props:', { ...this.props });
    const { loading, contacts, deleteContact } = this.props;

    return (
      <div className={this.cx()}>
        {loading ? 'Loading...' : this.contactsList(contacts, deleteContact)}
      </div>
    );
  }
}

export default ContactsList;
