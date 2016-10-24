import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { addContact } from 'lib/redux/contacts';
import ContactForm from 'components/organisms/ContactForm';

class ContactFormContainer extends PureComponent {
  static propTypes = {
    addContact: PropTypes.func.isRequired
  };

  render() {
    return <ContactForm onCreate={this.props.addContact} />
  }
}

export default connect(null, { addContact })(ContactFormContainer);
