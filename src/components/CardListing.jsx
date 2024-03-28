

import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function CardListing({ location, distance, booking_start, booking_end, price, rating, image }) {
  return (
    <Card style={{ width: '18rem', borderStyle: 'none', cursor: 'pointer' }}>
      <Card.Img style={{ height: '200px', width: '100%', borderRadius: '20px' }} variant="top" src={image} />
      <Card.Body>
        <Card.Title><span style={{ fontWeight: 'bold' }} >{location}</span></Card.Title>
        <Card.Text>
          <Row>
            <Col >
              <p >{distance} kilometers away</p>
              <p>{booking_start && booking_end && 'UNAVAILABLE'}</p>
            </Col>
            <Col sm={1} className='d-flex justify-content-end' >
              {rating}/5
            </Col>
          </Row>
        </Card.Text>
        <p><span style={{ fontWeight: 'bold' }} >RM{price}</span> night</p>
      </Card.Body>
    </Card>
  );
}

export default CardListing;