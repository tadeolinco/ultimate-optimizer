import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import uuid from 'uuid/v1';
import ObjectiveFunction from './ObjectiveFunction';
import Constraints from './Constraints';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Tableau from './Tableau';
import MaximizeButton from './MaximizeButton';
import SolveButton from './SolveButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import { navbarHeight } from '../Navbar/Navbar';

class UltimateOptimizer extends Component {
  state = {
    zs: [{ value: 0, id: uuid() }],
    constraints: [],
    maximize: true,
    tables: [],
    selectedTable: -1,
    tab: 'input' // or table, graph
  };

  handleSolve = () => {
    // initialize headers to be the x1, x2, etc
    const headers = [
      ...this.state.zs.map((z, index) => ({ title: 'X', sub: index + 1 }))
    ];
    const data = [
      ...this.state.constraints.map((constraint, index, constraints) => {
        headers.push({ title: 'S', sub: index + 1 });
        return [
          ...constraint.values.map(v => +v),
          ...constraints.map((c, i) => (i === index ? 1 : 0)),
          0,
          +constraint.constant
        ];
      })
    ];
    headers.push({ title: 'Z', sub: 0 });
    headers.push({ title: 'Solution', sub: 0 });
    data.push([
      ...this.state.zs.map(z => 0 - +z.value),
      ...this.state.constraints.map(() => 0),
      1,
      0
    ]);

    let iteration = 0;
    const Z = data.length - 1;
    const SOLUTION = headers.length - 1;
    while (true) {
      let pivotRow = null;
      let pivotCol = null;
      let minimumElement = 0;
      data[Z].forEach((cell, index) => {
        if (cell < minimumElement) {
          minimumElement = cell;
          pivotCol = index;
        }
      });

      let minimumRatio = Infinity;
      let pivotElement = 100;
      for (let row = 0; row < data.length; ++row) {
        const a = data[row][SOLUTION];
        const b = data[row][pivotCol];
        if (b <= 0) continue;

        const ratio = a / b;
        if (ratio >= 0 && ratio < minimumRatio) {
          minimumRatio = ratio;
          pivotElement = b;
          pivotRow = row;
        }
      }

      data[pivotRow] = data[pivotRow].map(cell => cell / pivotElement);
      for (let row = 0; row < data.length; ++row) {
        if (row === pivotRow) continue;
        data[row] = data[row].map(
          (cell, index) => -data[row][pivotCol] * data[pivotRow][index] + cell
        );
      }
      this.setState({
        tables: [
          ...this.state.tables,
          {
            headers: [...headers],
            data: data.map(row => [...row])
          }
        ]
      });
      iteration++;
      if (!data[Z].find(cell => cell < 0)) break;
    }
    this.setState({ selectedTable: 0 });
  };

  handleAddZ = () => {
    const zs = [...this.state.zs, { value: 0, id: uuid() }];
    const constraints = this.state.constraints.map(constraint => {
      return { ...constraint, values: [...constraint.values, 0] };
    });
    this.setState({ zs, constraints });
  };

  handleAddConstraint = () => {
    this.setState({
      constraints: [
        ...this.state.constraints,
        {
          values: [...this.state.zs.map(() => 0)],
          sign: '<=',
          constant: 0,
          id: uuid()
        }
      ]
    });
  };

  handleRemoveZ = event => {
    if (this.state.zs.length === 1) return;
    let index = -1;
    const zs = this.state.zs.filter((z, i) => {
      if (z.id === event.target.id) {
        index = i;
        return false;
      }
      return true;
    });
    const constraints = this.state.constraints.map(constraint => {
      const values = constraint.values.filter((v, i) => index !== i);
      return { ...constraint, values };
    });
    this.setState({ zs, constraints });
  };

  handleRemoveConstraint = event => {
    this.setState({
      constraints: this.state.constraints.filter(
        constraint => constraint.id !== event.target.id
      )
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

  handleChangeConstraintValue = (id, index, value) => {
    if (isNaN(value)) return;
    const constraints = this.state.constraints.map(constraint => {
      if (constraint.id === id) {
        const values = constraint.values.map((v, i) => {
          if (i === +index) return !value ? 0 : value;
          return v;
        });
        return { ...constraint, values: [...values] };
      }
      return constraint;
    });
    this.setState({ constraints });
  };

  handleChangeConstraintSign = (id, value) => {
    const constraints = this.state.constraints.map(constraint => {
      if (constraint.id === id) {
        return { ...constraint, sign: value };
      }
      return constraint;
    });
    this.setState({ constraints });
  };

  handleChangeConstraintConstant = (id, value) => {
    if (isNaN(value)) return;
    const constraints = this.state.constraints.map(constraint => {
      if (constraint.id === id) {
        return { ...constraint, constant: !value ? 0 : value };
      }
      return constraint;
    });
    this.setState({ constraints });
  };

  handleToggleMaximize = () =>
    this.setState({ maximize: !this.state.maximize });

  handleChangeTab = tab => {
    this.setState({ tab });
  };

  render() {
    const tabStyle = { padding: 25 };

    return (
      <Paper>
        <Tabs
          value={this.state.tab}
          onChange={this.handleChangeTab}
          contentContainerStyle={tabStyle}>
          <Tab label="Input" value="input">
            <ObjectiveFunction
              zs={this.state.zs}
              handleChangeZ={this.handleChangeZ}
              handleAddZ={this.handleAddZ}
              handleRemoveZ={this.handleRemoveZ}
            />
            <Divider />
            <Constraints
              constraints={this.state.constraints}
              handleAddConstraint={this.handleAddConstraint}
              handleChangeConstraintConstant={
                this.handleChangeConstraintConstant
              }
              handleChangeConstraintValue={this.handleChangeConstraintValue}
              handleChangeConstraintSign={this.handleChangeConstraintSign}
              handleRemoveConstraint={this.handleRemoveConstraint}
            />
            <Divider />
            <br />
            <span>
              <MaximizeButton
                maximize={this.state.maximize}
                handleToggleMaximize={this.handleToggleMaximize}
              />
            </span>
            <span>
              <SolveButton handleSolve={this.handleSolve} />
            </span>
          </Tab>
          <Tab label="Table" value="table">
            {this.state.selectedTable === -1 ? (
              <div style={{ textAlign: 'center' }}>Input first</div>
            ) : (
              <Tableau
                selectedTable={this.state.selectedTable}
                tables={this.state.tables}
              />
            )}
          </Tab>
          <Tab label="Graph" value="graph">
            {/*  */}
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}

export default UltimateOptimizer;
