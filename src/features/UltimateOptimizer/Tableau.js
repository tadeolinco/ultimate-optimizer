import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';

const Tableau = props => {
  const table = props.tables[props.selectedTable];
  console.log(table);
  const { headers, data } = table;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeaderColumn key={index}>
              {header.title}
              {Boolean(header.sub) && <sub>{header.sub}</sub>}{' '}
            </TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>{/*  */}</TableBody>
      <TableFooter>{/*  */}</TableFooter>
    </Table>
  );
};

export default Tableau;
