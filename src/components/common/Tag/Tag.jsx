import './Tag.scss';

import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { COLORS } from 'theme/constants';

class Tag extends Component {
  static propTypes = {
    color: PropTypes.oneOf(COLORS)
  };

  static defaultProps = {
    color: COLORS[0]
  };

  cx() {
    const { color, className } = this.props;

    return cx(className, 'Tag', {
      [`Tag--${color}`]: color
    })
  }

  render() {
    return <small className={this.cx()}>{this.props.children}</small>;
  }
}

export default Tag;
