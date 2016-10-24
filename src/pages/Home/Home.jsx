import './Home.scss';

import React, { PropTypes, PureComponent } from 'react';
import ContactsListContainer from 'containers/ContactsListContainer';
import ContactFormContainer from 'containers/ContactFormContainer';
import Tag from 'components/atoms/Tag';

class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <h1 className="Home__title">
          Contact List <Tag color="blue">DEMO APP</Tag>
        </h1>
        <div className="grid-flex-container">
          <div className="grid-flex-cell-1of2">
            <ContactsListContainer />
          </div>
          <div className="grid-flex-cell-1of2">
            <ContactFormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
