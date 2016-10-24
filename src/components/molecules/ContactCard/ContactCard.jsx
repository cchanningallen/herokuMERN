import './ContactCard.scss';

import React, {PropTypes, PureComponent} from 'react';

class ContactCard extends PureComponent {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email:  PropTypes.string,
    _id: PropTypes.string,
    onDelete: PropTypes.func.isRequired
  };

  handleDelete = () => {
    this.props.onDelete(this.props.idx);
  };

  render() {
    const { firstName, lastName, email } = this.props;

    return (
      <div className="ContactCard grid-flex-container">
        <div className="grid-flex-cell">
          <div>{`Name: ${firstName} ${lastName}`}</div>
          <div>{`Email: ${email}`}</div>
        </div>
        <div className="grid-flex-cell-1of4">
          <a className="ContactCard__delete-btn button button-warn"
             onClick={this.handleDelete}>
            x
          </a>
        </div>
      </div>
    );
  }
}

export default ContactCard;
