import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="d-flex gap-2">
      {device.types.map(type => (
        <div
          style={{
            cursor: 'pointer',
            color: type.id === device.selectedType.id ? 'orange' : 'black',
          }}
          onClick={() => {
            if (device.selectedType.id === type.id) {
              device.setSelectedType({});
            } else {
              device.setSelectedType(type);
            }
          }}
          key={type.id}
        >
          {type.name}
        </div>
      ))}
    </div>
  );
});

export default TypeBar;
