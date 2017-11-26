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

const functionify = (coefficients, constant) => x => {
  return (
    coefficients.reduce((coefficient, value) => value + coefficient * x, 0) -
    constant
  );
};

const Graph = props => {
  const objectiveFunction = functionify(props.zs.map(z => +z.value), 0);
  const constraintFunctions = props.constraints.map(constraint =>
    functionify(constraint.values.map(v => +v), +constraint.constant)
  );

  const zData = [];
  let constraintsData = [...constraintFunctions.map(() => [])];
  for (let x = props.domain.start; x <= props.domain.end; ++x) {
    zData.push({ x, y: objectiveFunction(x) });
    constraintFunctions.forEach((fxn, index) => {
      constraintsData[index].push({ x, y: fxn(x) });
    });
  }

  return (
    <FlexibleWidthXYPlot height={450}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <LineSeries data={zData} curve={'curveMonotoneX'} />
      {constraintsData.map((data, index) => (
        <LineSeries key={index} data={data} curve={'curveMonotoneX'} />
      ))}
      <DiscreteColorLegend
        orientation="horizontal"
        items={['Z', ...constraintsData.map((c, i) => `Constraint ${i + 1}`)]}
      />
      <XAxis />
      <YAxis />
    </FlexibleWidthXYPlot>
  );
};

export default Graph;
