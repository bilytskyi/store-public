import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="row gx-1 ">
      <Stack direction="horizontal" gap={2} className=" flex-wrap">
        <Badge bg="secondary" className="p-2">
          Secondary
        </Badge>
        <Badge bg="secondary" className="p-2">
          Secondary
        </Badge>
        <Badge bg="secondary" className="p-2">
          Secondary
        </Badge>
        <Badge bg="secondary" className="p-2">
          Secondary
        </Badge>
        <Badge bg="dark" className="p-2">
          Secondary
        </Badge>
        <Badge bg="secondary" className="p-2">
          Secondary
        </Badge>
        <Badge bg="secondary" className="p-2">
          Secondary
        </Badge>
      </Stack>
    </Row>
  );
});

export default BrandBar;
