import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import uuid from 'uuid/v1';
import ObjectiveFunction from './ObjectiveFunction';
import Constraints from './Constraints';
import Divider from 'material-ui/Divider';

class UltimateOptimizer extends Component {
  state = {
    zs: [{ value: 0, id: uuid() }],
    constraints: []
  };

  handleAddZ = () => {
    this.setState({ zs: [...this.state.zs, { value: 0, id: uuid() }] });
  };

  handleRemoveZ = event => {
    if (this.state.zs.length === 1) return;
    this.setState({
      zs: this.state.zs.filter(z => z.id !== event.target.id)
    });
  };

  handleChangeZ = event => {
    const { value, id } = event.target;
    if (isNaN(value)) return;
    const zs = this.state.zs.map(z => {
      if (z.id === id) {
        return { ...z, value: !value ? 0 : value };
      }
      return z;
    });
    this.setState({ zs });
  };

  render() {
    const paperStyle = { padding: 20, height: '100%' };

    return (
      <Paper style={paperStyle}>
        <ObjectiveFunction
          zs={this.state.zs}
          handleChangeZ={this.handleChangeZ}
          handleAddZ={this.handleAddZ}
          handleRemoveZ={this.handleRemoveZ}
        />
        <Divider />
        <Constraints />
      </Paper>
    );
  }
}

export default UltimateOptimizer;
