import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Title from './Title';

export const navbarHeight = 128;

class Navbar extends Component {
  render() {
    return (
      <AppBar
        style={{ transition: 'all 0.4s' }}
        titleStyle={{ height: navbarHeight, lineHeight: `${navbarHeight}px` }}
        title={<Title {...this.props} />}
        showMenuIconButton={false}
      />
    );
  }
}

export default Navbar;
