import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import { grey100, grey200, grey300 } from 'material-ui/styles/colors';

const Tableau = props => {
  const table = props.tables[props.selectedTable];
  const { headers, data, pivotColumn, pivotElement } = table;
  const basicSolutionHeaders = headers.slice(0, -1);
  const style = { textAlign: 'center', fontSize: 12 };
  const pivotColumnStyle = { backgroundColor: grey200 };
  const pivotElementStyle = { backgroundColor: grey300 };
  const solutionColumn = headers.length - 1;
  let solution = [];
  const xs = headers.filter(header => header.title === 'X').length;
  return (
    <div>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={{ backgroundColor: grey100 }}>
            <TableHeaderColumn style={style} colSpan={headers.length}>
              {props.selectedTable === 0 ? 'Initial Tableau' : 'Tableau'}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeaderColumn style={style} key={index}>
                {header.title}
                {Boolean(header.sub) && <sub>{header.sub}</sub>}{' '}
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => {
                let cellStyle = { ...style };
                if (rowIndex === pivotElement && cellIndex === pivotColumn)
                  cellStyle = { ...cellStyle, ...pivotElementStyle };
                else if (cellIndex === pivotColumn)
                  cellStyle = { ...cellStyle, ...pivotColumnStyle };

                return (
                  <TableRowColumn style={cellStyle} key={cellIndex}>
                    {cell}
                  </TableRowColumn>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={{ backgroundColor: grey100 }}>
            <TableHeaderColumn
              style={style}
              colSpan={basicSolutionHeaders.length}>
              Basic Solution
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            {basicSolutionHeaders.map((header, index) => (
              <TableHeaderColumn style={style} key={index}>
                {header.title}
                {Boolean(header.sub) && <sub>{header.sub}</sub>}{' '}
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            {basicSolutionHeaders.map((header, colIndex) => {
              const tokens = data.map(
                (row, rowIndex) => data[rowIndex][colIndex]
              );

              if (
                tokens.filter(v => v === 0 || v === 1).length === data.length
              ) {
                if (tokens.filter(v => v === 1).length === 1) {
                  const index = tokens.findIndex(token => token === 1);
                  if (index !== -1) {
                    solution.push(data[index][solutionColumn]);
                    return (
                      <TableRowColumn style={style} key={colIndex}>
                        {data[index][solutionColumn]}
                      </TableRowColumn>
                    );
                  }
                }
              }
              solution.push(0);
              return (
                <TableRowColumn style={style} key={colIndex}>
                  0
                </TableRowColumn>
              );
            })}
          </TableRow>
          {props.selectedTable === props.tables.length - 1 && (
            <TableRow>
              <TableRowColumn
                colSpan={basicSolutionHeaders.length}
                style={{ ...style, fontSize: 16 }}>
                <span>With these results, it can be concluded that with </span>
                {solution.slice(0, xs).map((sol, index) => {
                  const { sub } = basicSolutionHeaders[index];
                  return (
                    <span key={index}>
                      {sol} X<sub>{sub}</sub>s{index === xs - 2
                        ? ' and '
                        : ', '}
                    </span>
                  );
                })}
                <span>
                  a Z of {solution[solution.length - 1]} can be achieved.
                </span>
              </TableRowColumn>
            </TableRow>
          )}
          <TableRow>
            <TableRowColumn
              colSpan={basicSolutionHeaders.length}
              style={{ textAlign: 'center' }}>
              <IconButton
                disabled={props.selectedTable === 0}
                onClick={() =>
                  props.handleChangeTable(props.selectedTable - 1)
                }>
                <LeftIcon />
              </IconButton>
              <span style={{ fontSize: 24 }}>
                {props.selectedTable + 1} / {props.tables.length}
              </span>
              <IconButton
                disabled={props.selectedTable === props.tables.length - 1}
                onClick={() =>
                  props.handleChangeTable(props.selectedTable + 1)
                }>
                <RightIcon />
              </IconButton>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Tableau;
