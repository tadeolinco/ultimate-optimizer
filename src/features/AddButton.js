import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddButton = props => (
  <FloatingActionButton
    name={props.name}
    mini
    onClick={props.handleOnClick}
    style={{ position: 'relative', top: 2 }}>
    <ContentAdd />
  </FloatingActionButton>
);

export default AddButton;
