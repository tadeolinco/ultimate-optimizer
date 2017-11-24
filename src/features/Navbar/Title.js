import React from 'react';
import Icon from './Icon';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from '../../constants';
import { navbarHeight } from './Navbar';

const titleStyle = {
  fontSize: 32,
  cursor: 'pointer'
};

const currentTitleStyle = {
  ...titleStyle,
  textDecoration: 'underline'
};

const Title = props => (
  <div style={{ display: 'flex', height: navbarHeight }}>
    <div
      style={{
        width: `calc(48% - ${navbarHeight / 2}px)`,
        marginRight: '2%',
        textAlign: 'right'
      }}>
      <span
        style={
          props.solver === ULTIMATE_OPTIMIZER ? currentTitleStyle : titleStyle
        }
        onClick={() => props.handleChangeSolver(ULTIMATE_OPTIMIZER)}>
        {ULTIMATE_OPTIMIZER}
      </span>
    </div>
    <div style={{ width: navbarHeight, textAlign: 'center' }}>
      {<Icon solver={props.solver} />}
    </div>
    <div style={{ marginLeft: '2%', textAlign: 'left' }}>
      <span
        style={props.solver === SMART_INVEST ? currentTitleStyle : titleStyle}
        onClick={() => props.handleChangeSolver(SMART_INVEST)}>
        {SMART_INVEST}
      </span>
    </div>
  </div>
);

export default Title;
