import React from 'react';
import TextField from 'material-ui/TextField';
import AddButton from '../AddButton';
import DeleteBadge from '../DeleteBadge';

const ObjectiveFunction = props => (
  <div>
    <div className="label">
      Objective Function{' '}
      <AddButton size={20} handleOnClick={props.handleAddZ} />
    </div>
    <br />

    <span>Z = </span>
    {props.zs.map((z, index) => (
      <div key={z.id} style={{ display: 'inline' }}>
        {index !== 0 && <span style={{ margin: '0 10px' }}>+</span>}
        <DeleteBadge id={z.id} handleOnClick={props.handleRemoveZ}>
          <div style={{ padding: '20px 10px 0px', display: 'inline' }}>
            <TextField
              inputStyle={{ fontSize: '28px' }}
              id={z.id}
              value={z.value}
              style={{
                width: `${(z.value + '').length * 16}px`
              }}
              onChange={props.handleChangeZ}
            />
            <span>
              {' '}
              * x <sub>{index + 1}</sub>{' '}
            </span>
          </div>
        </DeleteBadge>
      </div>
    ))}
  </div>
);

export default ObjectiveFunction;
