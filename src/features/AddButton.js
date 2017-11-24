import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddButton = props => (
  <FloatingActionButton
    mini
    onClick={props.handleOnClick}
    style={{ position: 'relative' }}>
    <ContentAdd />
  </FloatingActionButton>
);

export default AddButton;
