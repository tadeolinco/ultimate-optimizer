import React from 'react';
import TextField from 'material-ui/TextField';
import AddButton from '../AddButton';
import DeleteBadge from '../DeleteBadge';
import FlatButton from 'material-ui/FlatButton';

const Constraints = props => (
  <div>
    <div className="label">
      <span style={{ paddingRight: 20 }}>Constraints</span>
      <AddButton handleOnClick={props.handleAddConstraint} name="add-c" />
    </div>

    {props.constraints.map((constraint, index1) => (
      <div key={constraint.id}>
        <DeleteBadge
          right={-10}
          id={constraint.id}
          handleOnClick={props.handleRemoveConstraint}>
          <span style={{ paddingRight: 10 }}>
            {constraint.values.map((v, index2) => (
              <div key={index2} style={{ display: 'inline' }}>
                {index2 !== 0 && <span style={{ margin: '0 10px' }}>+</span>}
                <TextField
                  className={'c' + index1 + index2}
                  inputStyle={{ fontSize: '28px' }}
                  id={constraint.id}
                  value={v}
                  style={{
                    width: `${(v + '').length * 16}px`
                  }}
                  onChange={event =>
                    props.handleChangeConstraintValue(
                      constraint.id,
                      index2,
                      event.target.value
                    )
                  }
                />
                <span>
                  {' '}
                  * x <sub>{index2 + 1}</sub>
                </span>
              </div>
            ))}
            <FlatButton
              style={{ minWidth: 10 }}
              label={constraint.sign}
              labelStyle={{ fontSize: 28 }}
              onClick={() =>
                props.handleChangeConstraintSign(
                  constraint.id,
                  constraint.sign === '>=' ? '<=' : '>='
                )
              }
            />
            <TextField
              className={'c' + index1}
              inputStyle={{ fontSize: '28px' }}
              id={constraint.id}
              value={constraint.constant}
              style={{
                width: `${(constraint.constant + '').length * 16}px`
              }}
              onChange={event =>
                props.handleChangeConstraintConstant(
                  constraint.id,
                  event.target.value
                )
              }
            />
          </span>
        </DeleteBadge>
      </div>
    ))}
  </div>
);

export default Constraints;
