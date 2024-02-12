import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import {SERVER_URL} from '../Services/serverUrl'

function ProjectCard({project}) {
  // console.log(project);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {project&& <Card onClick={handleShow} style={{ width: '20rem' }} className='shadow btn-mb-5'>
        <Card.Img width={'100%'} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
        <Card.Body>
          <Card.Title>{project?.title}</Card.Title>
        </Card.Body>
      </Card> }

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md-6>
              <Card.Img width={'100%'} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
            </Col>

            <Col md={6}>
              <h2 className='fw-bolder text-dark'>{project?.title}</h2>
              <p>Projeact OverView: <span className='fw-bolder ' style={{ textAlign: 'justify' }}>{project?.overview} </span></p>
              <p >Lnguage Used: <span className='fw-bolder text-danger'>{project?.language}</span></p>
            </Col>
          </Row>
          <div className='mt-3'>
            <a href={project?.github}target='_blank' className='btn me-3'> <i style={{ height: '40px' }} className='fa-brands fa-github fa-2x'></i></a>
            <a href={project?.website} target='_blank' className='btn me-3'> <i style={{ height: '40px' }} className='fa-solid fa-link fa-2x'></i></a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard