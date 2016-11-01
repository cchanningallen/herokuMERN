import './ContactsList.scss';

import React, {PropTypes, PureComponent} from 'react';
import { List } from 'immutable';
import ContactCard from 'components/molecules/ContactCard';
import cxHelpers from 'lib/decorators/classNameHelpers';

class ContactsList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    removeContact: PropTypes.func.isRequired,
    contacts: PropTypes.instanceOf(List).isRequired
  };

  contactsList(contacts, onDelete) {
    if (contacts.size > 0) {
      return(
        <div className={this.cxEl('list')}>
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
    const { isLoading, contacts, removeContact } = this.props;

    return (
      <div className={this.cx()}>
        {isLoading ? 'Loading...' : null}
        {contacts ? this.contactsList(contacts, removeContact) : null}
      </div>
    );
  }
}

export default cxHelpers(ContactsList);
