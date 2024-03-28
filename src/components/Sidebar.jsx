import { Button, Col } from "react-bootstrap"
import './Sidebar.css';


const Sidebar = () => {



  return (
    <>
      <hr style={{ margin: '0' }} />
      <Col
        sm={2}
        className="d-flex flex-column justify-content-start align-items-center bg-light vh-100 "
        style={{ position: "sticky", top: 0 }}
      >

        <Button className=" d-flex  justify-content-start side-Button my-2 rounded-pill  "><i className="bi bi-airplane-engines"></i>
          <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Travel</span>
          <i className="bi bi-airplane-engines"></i></Button>

        <Button className=" d-flex  justify-content-start side-Button my-2 rounded-pill  "><i className="bi bi-house-door"></i> <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Homestay</span>  <i className="bi bi-house-door"></i></Button>

        <Button className=" d-flex  justify-content-start side-Button my-2 rounded-pill  "><i className="bi bi-car-front-fill"></i> <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Transport</span><i className="bi bi-car-front-fill"></i></Button>


        <Button className=" d-flex  justify-content-start side-Button my-2 rounded-pill  "><i className="bi bi-file-music"></i> <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Otel</span> <i className="bi bi-file-music"></i></Button>


      </Col>

    </>
  )
}

export default Sidebar