import React from 'react';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import OptimizerIcon from 'material-ui/svg-icons/action/trending-up';
import { ULTIMATE_OPTIMIZER } from '../../constants';
import { navbarHeight } from './Navbar';

const iconStyle = { width: '100%', height: navbarHeight, color: 'white' };

const Icon = props =>
  props.solver === ULTIMATE_OPTIMIZER ? (
    <OptimizerIcon style={iconStyle} />
  ) : (
    <MoneyIcon style={iconStyle} />
  );

export default Icon;
