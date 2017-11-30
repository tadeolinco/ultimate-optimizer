import React from 'react';
import {
  FlexibleWidthXYPlot,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  YAxis,
  XAxis,
  DiscreteColorLegend
} from 'react-vis';

const twoPoint = (x1, x2, constant, x) => (constant - x * x1) / x2;
const Graph = props => {
  const lastTable = props.tables[props.tables.length - 1].data;
  const lastRow = lastTable[lastTable.length - 1];
  const Z = +lastRow[lastRow.length - 1];
  console.log(Z);
  let maxY = -Infinity;
  let minY = Infinity;
  let y = null;

  let zData = [];
  let constraintsData = props.constraints.map(() => []);

  const twoPointConstraints = props.constraints
    .map((constraint, index) => ({
      ...constraint,
      index
    }))
    .filter(constraint => constraint.values.filter(v => v).length === 2);
  const linearConstraints = props.constraints
    .map((constraint, index) => ({
      ...constraint,
      index
    }))
    .filter(constraint => constraint.values.filter(v => v).length === 1);

  for (let x = props.domain.start; x <= props.domain.end; ++x) {
    y = twoPoint(
      +props.zs[0].value,
      +(props.zs[1] ? props.zs[1].value : 1),
      Z,
      x
    );
    maxY = Math.max(y, maxY);
    minY = Math.min(y, minY);
    zData.push({ x, y });
    twoPointConstraints.forEach(constraint => {
      y = twoPoint(
        +constraint.values[0],
        +constraint.values[1],
        +constraint.constant,
        x
      );
      maxY = Math.max(y, maxY);
      minY = Math.min(y, minY);
      constraintsData[constraint.index].push({ x, y });
    });
  }

  linearConstraints.forEach(constraint => {
    if (!constraint.values[0]) {
      constraintsData[constraint.index].push({
        x: props.domain.start,
        y: constraint.constant / +constraint.values[1]
      });
      constraintsData[constraint.index].push({
        x: props.domain.end,
        y: constraint.constant / +constraint.values[1]
      });
    } else {
      constraintsData[constraint.index].push({
        x: constraint.constant / +constraint.values[0],
        y: minY
      });
      constraintsData[constraint.index].push({
        x: constraint.constant / +constraint.values[0],
        y: maxY
      });
    }
  });
  console.log(constraintsData);
  return (
    <FlexibleWidthXYPlot height={450}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <LineSeries data={zData} curve={'curveMonotoneX'} />
      {constraintsData.map((data, index) => (
        <LineSeries key={index} data={data} curve={'curveMonotoneX'} />
      ))}
      <LineSeries
        data={[{ x: props.domain.start, y: 0 }, { x: props.domain.end, y: 0 }]}
      />
      <LineSeries data={[{ x: 0, y: minY }, { x: 0, y: maxY }]} />
      <DiscreteColorLegend
        orientation="horizontal"
        items={[
          'Objective Function',
          ...constraintsData.map((c, i) => `Constraint ${i + 1}`),
          'X Axis',
          'Y Axis'
        ]}
      />
      <XAxis />
      <YAxis />
    </FlexibleWidthXYPlot>
  );
};

export default Graph;
