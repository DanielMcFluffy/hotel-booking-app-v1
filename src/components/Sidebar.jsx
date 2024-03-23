import { Button, Col } from "react-bootstrap"



const Sidebar = () => {
  return (
    <>
      <hr style={{ margin: '0' }} />
      <Col
        sm={1}
        className="d-flex flex-column justify-content-start align-items-center bg-light vh-100 "
        style={{ position: "sticky", top: 0 }}
      >

        <Button style={{ width: '90%' }} className="my-2 rounded-pill">Stuff</Button>

        <Button style={{ width: '90%' }} className="my-2 rounded-pill">Stuff</Button>
        <Button style={{ width: '75%' }} className="my-2 rounded-pill">Stuff</Button>
      </Col>

    </>
  )
}

export default Sidebar