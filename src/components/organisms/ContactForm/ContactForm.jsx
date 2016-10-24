import './ContactForm.scss';

import React, {PropTypes, PureComponent} from 'react';

class ContactForm extends PureComponent {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    this.props.onCreate({
      firstName: "Channing",
      lastName: "Allen",
      email: "cchanningallen@gmail.com"
    })
  };

  render() {
    return (
      <div className="ContactForm">
        <a className="button button-approve"
           onClick={this.handleSubmit}>
          Create Contact
        </a>
      </div>
    );
  }
}

export default ContactForm;
