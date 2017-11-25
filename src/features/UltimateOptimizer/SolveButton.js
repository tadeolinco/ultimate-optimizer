import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const SolveButton = props => (
  <RaisedButton
    name="solve"
    primary
    labelStyle={{ fontSize: 20 }}
    style={{
      width: '25%',
      marginLeft: `${50 / 3}%`,
      marginTop: 10
    }}
    label="Solve"
    onClick={props.handleSolve}
  />
);

export default SolveButton;
