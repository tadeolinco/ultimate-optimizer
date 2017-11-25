import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';

class DeleteBadge extends Component {
  state = { visible: false, forever: false };

  handleOnMouseEnter = () => this.setState({ visible: true });
  handleOnMouseLeave = () => this.setState({ visible: false });

  render() {
    return (
      <div
        style={{ display: 'inline', position: 'relative' }}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}>
        {this.props.children}
        {this.state.visible && (
          <IconButton
            id={this.props.id}
            onMouseEnter={() => this.setState({ forever: true })}
            onMouseLeave={() => this.setState({ forever: false })}
            style={{
              position: 'absolute',
              top: -16,
              right: this.props.right || 0,
              padding: 0,
              width: 24,
              height: 24
            }}
            onClick={this.props.handleOnClick}>
            {this.state.forever ? <DeleteForeverIcon /> : <DeleteIcon />}
          </IconButton>
        )}
      </div>
    );
  }
}

export default DeleteBadge;
