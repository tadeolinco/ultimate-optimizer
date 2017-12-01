import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import uuid from 'uuid/v1';
import ObjectiveFunction from './ObjectiveFunction';
import Constraints from './Constraints';
import Divider from 'material-ui/Divider';
import Tableau from './Tableau';
import MaximizeButton from './MaximizeButton';
import SolveButton from './SolveButton';
import Graph from './Graph';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Tabs, Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';

class UltimateOptimizer extends Component {
  state = {
    zs: [{ value: 0, id: uuid() }],
    constraints: [
      {
        values: [0],
        sign: '<=',
        constant: 0,
        id: uuid()
      }
    ],
    maximize: true,
    tables: [],
    selectedTable: -1,
    tab: 'input', // or table, graph,
    help: false
  };

  handleSolve = () => {
    this.setState({ z: 0 });
    let tables = [];
    // initialize headers to be the x1, x2, etc
    let headers = [
      ...this.state.zs.map((z, index) => ({ title: 'X', sub: index + 1 }))
    ];
    let data = [
      ...this.state.constraints.map((constraint, index, constraints) => {
        headers.push({ title: 'S', sub: index + 1 });
        return [
          ...constraint.values.map(v => +v),
          ...constraints.map(
            (c, i) => (i === index ? (constraint.sign === '<=' ? 1 : -1) : 0)
          ),
          0,
          +constraint.constant
        ];
      })
    ];
    headers = [
      ...headers,
      { title: 'Z', sub: 0 },
      { title: 'Solution', sub: 0 }
    ];
    data.push([
      ...this.state.zs.map(
        z => (this.state.maximize ? 0 - +z.value : +z.value)
      ),
      ...this.state.constraints.map(() => 0),
      1,
      0
    ]);
    tables = [
      ...tables,
      {
        headers,
        data: [...data.map(row => [...row])],
        pivotRow: -1,
        pivotElement: -1
      }
    ];
    const Z = data.length - 1;
    const SOLUTION = headers.length - 1;
    while (data[Z].find(cell => cell < 0)) {
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
      if (pivotRow === null) {
        return this.props.handleAddMessage('Error in solving');
      }
      data[pivotRow] = data[pivotRow].map(cell => cell / pivotElement);
      data = data.map((row, rowIndex) => {
        if (rowIndex === pivotRow) return row;
        return row.map(
          (cell, cellIndex) =>
            -data[rowIndex][pivotCol] * data[pivotRow][cellIndex] + cell
        );
      });
      tables = [
        ...tables,
        {
          headers: [...headers],
          data: data.map(row =>
            row.map(cell => {
              const tokens = ('' + cell).split('.');
              if (tokens.length === 1) return cell;
              return cell.toFixed(Math.min(tokens[1].length, 4));
            })
          ),
          pivotColumn: pivotCol,
          pivotElement: pivotRow
        }
      ];
    }
    this.setState({ selectedTable: 0, tab: 'table', tables });
  };

  handleChangeTable = table => {
    this.setState({ selectedTable: table });
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
    if (this.state.constraints.length === 1) return;
    this.setState({
      constraints: this.state.constraints.filter(
        constraint => constraint.id !== event.target.id
      )
    });
  };

  handleChangeZ = event => {
    const { value, id } = event.target;
    if (isNaN(value) && value !== '-') return;
    const zs = this.state.zs.map(z => {
      if (z.id === id) {
        return { ...z, value: !value ? 0 : value };
      }
      return z;
    });
    this.setState({ zs });
  };

  handleChangeConstraintValue = (id, index, value) => {
    if (isNaN(value) && value !== '-') return;
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
              <div style={{ textAlign: 'center' }}>Input a problem first</div>
            ) : (
              <Tableau
                selectedTable={this.state.selectedTable}
                tables={this.state.tables}
                handleChangeTable={this.handleChangeTable}
              />
            )}
          </Tab>
          <Tab label="Graph" value="graph">
            {this.state.selectedTable === -1 ? (
              <div style={{ textAlign: 'center' }}>Input a problem first</div>
            ) : this.state.zs.length > 2 ? (
              <div style={{ textAlign: 'center' }}>Only for 1-2 variables</div>
            ) : (
              <div style={{ paddingBottom: 50 }}>
                <Graph
                  zs={this.state.zs}
                  constraints={this.state.constraints}
                  domain={{ start: -20, end: 20 }}
                  maximize={this.state.maximize}
                  tables={this.state.tables}
                />
              </div>
            )}
          </Tab>
        </Tabs>
        <Dialog
          autoScrollBodyContent
          open={this.state.help}
          onRequestClose={() => this.setState({ help: false })}
          actions={[
            <FlatButton
              label="Thanks!"
              onClick={() => this.setState({ help: false })}
            />
          ]}>
          <div className="label">Ultimate Optimizer</div>
          <span>
            The ultimate optimizer lets the you input an objective function that
            you want to optimize, and its constraints. After solving, each
            tableau of each step will be shown as well as a short conclusion.
            The user can also see the graph of the functions.
          </span>
          <div className="label" />
          <Divider />
          <div className="label">Objective Function</div>
          <span>
            Enter here the variables that you want to optimize. You can add more
            variables by clicking on the Floating Action Button beside the
            label.
          </span>
          <div className="label">Constraints</div>
          <span>
            Enter here the constraints for your objective function. You can add
            more constraints by clicking on the Floating Action Button. The
            number of variables each constraint has will always mirror that of
            the objective function's. You can also click on the inequality sign
            to toggle it.
          </span>
          <div className="label">Maximize/Minimize</div>
          <span>
            Clicking on this button will toggle whether you want to maximize or
            minimize your objective function.
          </span>
          <div className="label">Solve</div>
          <span>
            Clicking this will make the program start computing for the most
            optimal solution. You will be directed to the Tables tab afterwards.
          </span>
          <div className="label" />
          <Divider />
          <div className="label">Table</div>
          <span>
            It can be shown here the tableau and basic solution for each step.
            The pivot column and pivot element is also highlighted is darker
            shades of gray. You can use the arrows below the tables to navigate
            through each table. At the last table, a conclusion about the
            optimization is shown.
          </span>
          <div className="label" />
          <Divider />
          <div className="label">Graph</div>
          <span>
            After solving, you can also see the graphs of the objective function
            and the constraints, although they are only line graphs.
          </span>
          <div className="label" />
        </Dialog>
        <FloatingActionButton
          onClick={() => this.setState({ help: true })}
          style={{ position: 'fixed', right: 40, bottom: 40 }}>
          <HelpIcon />
        </FloatingActionButton>
      </Paper>
    );
  }
}

export default UltimateOptimizer;
