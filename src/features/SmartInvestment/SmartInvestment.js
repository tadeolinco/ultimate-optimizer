import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import Dialog from 'material-ui/Dialog';

class SmartInvest extends Component {
  state = {
    initialInvestment: 0,
    years: 0,
    annualYield: 0,
    y: { maturity: 0, yield: 0, yieldAfter: 0 },
    z: { maturity: 0, yield: 0 },
    w: { maturity: 0, yield: 0 },
    solution: [],
    help: false
  };

  solve = () => {
    // y != 3
    // z > 1
    // w == 1
    const { initialInvestment, years, annualYield, y, z, w } = this.state;
    const lastYear = years + 1;
    let data = Array.apply(null, Array(lastYear)).map(() =>
      Array.apply(null, Array(5 * years + 2)).map(() => 0)
    );

    for (let year = 0; year < lastYear; ++year) {
      // x
      if (year + 1 !== lastYear) data[year][year] = 1;
      if (year + 1 > 1) data[year][year - 1] = -(1 + annualYield / 100);

      // y
      if (year + 1 !== 3 && year + 1 <= lastYear - y.maturity) {
        data[year][years + year] = 1;
      }
      if (year + 1 > y.maturity && year + 1 - y.maturity !== 3) {
        data[year][years + year - y.maturity] = -(
          1 +
          (year + 1 - y.maturity === 1 ? y.yield : y.yieldAfter) / 100
        );
      }

      // z
      if (year + 1 !== 1 && year + 1 <= lastYear - z.maturity) {
        data[year][years * 2 + year] = 1;
      }
      if (year + 1 > z.maturity && year + 1 - z.maturity !== 1) {
        data[year][years * 2 + year - z.maturity] = -(1 + z.yield / 100);
      }

      if (year + 1 === 1) {
        data[year][years * 3 + year] = 1;
      }
      if (year + 1 === w.maturity + 1) {
        data[year][years * 3 + year - w.maturity] = -(1 + w.yield / 100);
      }

      data[year][years * 4 + year] = 1;
    }
    data[0][data[data.length - 1].length - 1] = initialInvestment;
    const V = data.length - 1;
    const SOLUTION = data[V].length - 1;
    while (data[V].find(cell => cell < 0)) {
      let pivotRow = null;
      let pivotCol = null;
      let minimumElement = 0;
      data[V].forEach((cell, index) => {
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
      data = data.map((row, rowIndex) => {
        if (rowIndex === pivotRow) return row;
        return row.map(
          (cell, cellIndex) =>
            -data[rowIndex][pivotCol] * data[pivotRow][cellIndex] + cell
        );
      });
    }
    const solution = [];
    for (let col = 0; col < 5 * years + 1; ++col) {
      const column = [];
      for (let row = 0; row < lastYear; ++row) {
        column.push(data[row][col]);
      }
      let title = '';
      switch (Math.floor(col / years)) {
        case 0:
          title = 'X';
          break;
        case 1:
          title = 'Y';
          break;
        case 2:
          title = 'Z';
          break;
        case 3:
          title = 'W';
          break;
        case 4:
          title = 'S';
          break;
        case 5:
          title = 'V';
          break;
        default:
      }

      if (
        column.filter(cell => cell === 1).length === 1 &&
        column.filter(cell => cell === 0).length === lastYear - 1
      ) {
        solution.push({
          title,
          year: col % years + 1,
          amount: data[column.findIndex(cell => cell === 1)][SOLUTION]
        });
      } else {
        solution.push({
          title,
          year: col % years + 1,
          amount: 0
        });
      }
    }
    this.setState(
      {
        solution: solution
          .filter(solution => solution.amount !== 0 && solution.title !== 'S')
          .map(solution => ({
            ...solution,
            amount: solution.amount.toFixed(2)
          }))
      },
      () => {
        console.table(this.state.solution);
      }
    );
  };

  render() {
    return (
      <Paper>
        <div style={{ padding: 20 }}>
          {/* INITIAL INVESTMENT */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Initial Investment: </span>
            $<TextField
              id="initial-investment"
              style={{
                fontSize: 24,
                width: `${(this.state.initialInvestment + '').length * 13}px`
              }}
              value={this.state.initialInvestment}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({ initialInvestment: +value || 0 });
              }}
            />
          </div>
          <br />
          {/* YEARS */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Years of Investment: </span>
            <TextField
              id="years"
              style={{
                fontSize: 24,
                width: `${(this.state.years + '').length * 13}px`
              }}
              value={this.state.years}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({ years: +value || 0 });
              }}
            />
          </div>
          <br />
          {/* ANNUAL YIELD */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Annual Yield: </span>
            <TextField
              id="annual-yield"
              style={{
                fontSize: 24,
                width: `${(this.state.annualYield + '').length * 13}px`
              }}
              value={this.state.annualYield}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({ annualYield: +value || 0 });
              }}
            />%
          </div>
          <Divider />
          {/* SECURITY Y */}
          <div style={{ padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Security Y: </span>
          </div>
          {/* SECURITY Y MATURITY */}
          <div style={{ display: 'inline', padding: 10, paddingLeft: 50 }}>
            <span style={{ fontWeight: 'bold' }}>Year Maturity: </span>
            <TextField
              id="y-maturity"
              style={{
                fontSize: 24,
                width: `${((this.state.y.maturity + '').length || 1) * 13}px`
              }}
              value={this.state.y.maturity}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0 || value > +this.state.years)
                  return;
                this.setState({ y: { ...this.state.y, maturity: +value } });
              }}
            />
          </div>
          {/* SECURITY Y TOTAL YIELD */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Total Yield: </span>
            <TextField
              id="y-yield"
              style={{
                fontSize: 24,
                width: `${((this.state.y.yield + '').length || 1) * 13}px`
              }}
              value={this.state.y.yield}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({ y: { ...this.state.y, yield: +value } });
              }}
            />%
          </div>
          {/* SECURITY Y TOTAL YIELD THERE AFTER */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Total Yield Thereafter: </span>
            <TextField
              id="y-yield-after"
              style={{
                fontSize: 24,
                width: `${((this.state.y.yieldAfter + '').length || 1) * 13}px`
              }}
              value={this.state.y.yieldAfter}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({
                  y: { ...this.state.y, yieldAfter: +value }
                });
              }}
            />%
          </div>
          {/* SECURITY Z */}
          <div style={{ padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Security Z: </span>
          </div>
          {/* SECURITY Z MATURITY */}
          <div style={{ display: 'inline', padding: 10, paddingLeft: 50 }}>
            <span style={{ fontWeight: 'bold' }}>Year Maturity: </span>
            <TextField
              id="z-maturity"
              style={{
                fontSize: 24,
                width: `${((this.state.z.maturity + '').length || 1) * 13}px`
              }}
              value={this.state.z.maturity}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0 || value > +this.state.years)
                  return;
                this.setState({ z: { ...this.state.z, maturity: +value } });
              }}
            />
          </div>
          {/* SECURITY Z TOTAL YIELD */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Total Yield: </span>
            <TextField
              id="z-yield"
              style={{
                fontSize: 24,
                width: `${((this.state.z.yield + '').length || 1) * 13}px`
              }}
              value={this.state.z.yield}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({ z: { ...this.state.z, yield: +value } });
              }}
            />%
          </div>
          {/* SECURITY W */}
          <div style={{ padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Security W: </span>
          </div>
          {/* SECURITY W MATURITY */}
          <div style={{ display: 'inline', padding: 10, paddingLeft: 50 }}>
            <span style={{ fontWeight: 'bold' }}>Year Maturity: </span>
            <TextField
              id="w-maturity"
              style={{
                fontSize: 24,
                width: `${((this.state.w.maturity + '').length || 1) * 13}px`
              }}
              value={this.state.w.maturity}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0 || value > +this.state.years)
                  return;
                this.setState({ w: { ...this.state.w, maturity: +value } });
              }}
            />
          </div>
          {/* SECURITY W TOTAL YIELD */}
          <div style={{ display: 'inline', padding: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Total Yield: </span>
            <TextField
              id="w-yield"
              style={{
                fontSize: 24,
                width: `${((this.state.w.yield + '').length || 1) * 13}px`
              }}
              value={this.state.w.yield}
              onChange={event => {
                const { value } = event.target;
                if (isNaN(value) || value < 0) return;
                this.setState({ w: { ...this.state.w, yield: +value } });
              }}
            />%
          </div>
        </div>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <RaisedButton
            id="solve"
            primary
            labelStyle={{ fontSize: 20 }}
            label="Solve"
            onClick={this.solve}
            style={{ width: '25%' }}
          />
        </div>
        {Boolean(this.state.solution.length) && (
          <div style={{ padding: 20, textAlign: 'center' }}>
            The final yield after {this.state.years} years will be ${
              this.state.solution[this.state.solution.length - 1].amount
            }.
          </div>
        )}
        <FloatingActionButton
          onClick={() => this.setState({ help: true })}
          style={{ position: 'fixed', right: 40, bottom: 40 }}>
          <HelpIcon />
        </FloatingActionButton>
        <Dialog
          autoScrollBodyContent
          open={this.state.help}
          onRequestClose={() => {
            this.setState({ help: false });
          }}
          actions={[
            <FlatButton
              label="Thanks!"
              onClick={() => {
                this.setState({ help: false });
              }}
            />
          ]}>
          <div className="label">Smart Investment</div>
          <span>
            Use this tool to invest smartly in three different securities given
            your initial investment, years of investment, annual yield of your
            Savings Account, and the maturity rate and total yield from each of
            the securities.
          </span>
          <div className="label" />
          <Divider />
          <div className="label">Initial Investment</div>
          <span>
            Enter here the initial amount of money that you have that you can
            invest.
          </span>
          <div className="label">Years of Investment</div>
          <span>Enter here the number of years you want to invest.</span>
          <div className="label">Annual Yield</div>
          <span>Enter here the annual yield of your savings account.</span>
          <div className="label" />
          <Divider />
          <div className="label">Securities</div>
          <div className="label" style={{ fontSize: 24 }}>
            Maturity
          </div>
          <span>
            Enter here the number of years it takes for you to gain the total
            yield from the security.
          </span>
          <div className="label" style={{ fontSize: 24 }}>
            Total Yield
          </div>
          <span>
            Enter here the percent increase of your investment after maturity.
          </span>
          <div className="label" style={{ fontSize: 24 }}>
            Total Yield Thereafter
          </div>
          <span>
            Security Y is a special case. It changes the total yield if you
            didn't buy it within the first year. Enter here the percent increase
            of your investment after maturity if bought after the first year.
          </span>
          <div className="label" />
        </Dialog>
      </Paper>
    );
  }
}

export default SmartInvest;
