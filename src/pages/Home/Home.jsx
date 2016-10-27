import './Home.scss';

import React, { PropTypes, PureComponent } from 'react';
import ContactsListContainer from 'containers/ContactsListContainer';
import ContactFormContainer from 'containers/ContactFormContainer';
import Tag from 'components/atoms/Tag';

class Home extends PureComponent {
  constructor(){
    super()
    this.state = {counter: 0}
  }
  handlePing = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    return (
      <div className="Home">
        <h1 className="Home__title">
          Contact List <Tag color="blue">DEMO APP</Tag>
        </h1>
        <a className="button"
           onClick={this.handlePing}>
          Ping
        </a>
        <div>Pinged {this.state.counter} times</div>
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
