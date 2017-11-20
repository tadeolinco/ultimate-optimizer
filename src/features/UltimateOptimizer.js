import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import uuid from 'uuid/v1';

class UltimateOptimizer extends Component {
  state = {
    zs: [{ value: 0, id: uuid() }]
  };

  handleAddZ = () => {
    this.setState({ zs: [...this.state.zs, { value: 0, id: uuid() }] });
  };

  handleChangeZ = event => {
    const { value, id } = event.target;
    const zs = this.state.zs.map(z => {
      if (z.id === id) return { ...z, value };
      return z;
    });
    this.setState({ zs });
  };

  render() {
    return (
      <div>
        <span>Z = </span>
        {this.state.zs.map((z, index) => (
          <div key={z.id} style={{ display: 'inline', marginRight: 40 }}>
            <TextField
              id={z.id}
              value={z.value}
              style={{ width: 50 }}
              onChange={this.handleChangeZ}
            />
            <span>
              * x <sub>{index + 1}</sub>
            </span>
          </div>
        ))}
        <br />
        <RaisedButton onClick={this.handleAddZ} label="Add Z" />
      </div>
    );
  }
}

export default UltimateOptimizer;
