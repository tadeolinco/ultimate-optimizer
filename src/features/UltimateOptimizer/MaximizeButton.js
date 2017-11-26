import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const MaximizeButton = props => (
  <RaisedButton
    primary
    labelStyle={{ fontSize: 20 }}
    style={{ width: '25%', marginLeft: `${50 / 3}%` }}
    label={props.maximize ? 'Maximize' : 'Minimize'}
    onClick={props.handleToggleMaximize}
  />
);

export default MaximizeButton;
