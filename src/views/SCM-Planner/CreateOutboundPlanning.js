import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TableUserComponent from "../../components/Table/WMS-Principal-Table/TableMonitoringPOandShipmentPlan";
import "../../styling/Table-Custom.css";

function CreateOutboundPlanning() {
  const tableRef = useRef(null);

  // MODAL info
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleShowModal = () => {
    setShowModalInfo(true);
  };

  const handleCloseModal = () => {
    setShowModalInfo(false);
  };

  // MODAL Outbound Planning
  const [showModalOutboundPlan, setShowModalOutboundPlan] = useState(false);

  const handleModalOutboundPlan = () => {
    setShowModalOutboundPlan(true);
  };

  const handleCloseModalOutboundPlan = () => {
    setShowModalOutboundPlan(false);
  };

  // Form Handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="container">
        <h3 className="mb-4" onClick={handleShowModal}>
          Outbound Planning
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id"></th>
              <th className="nomor_po">Nomor PO</th>
              <th className="dc_tujuan">DC Tujuan</th>
              <th className="remarks">Remarks</th>
              <th className="status">Status</th>
            </tr>
          </thead>
        </Table>

        <div className="d-flex justify-content-center mt-5 mb-2">
          <Button className="mr-2" onClick={handleModalOutboundPlan}>
            Outbound Planning
          </Button>
        </div>
      </div>

      {/* Modal Outbound Plan */}
      <Modal
        show={showModalOutboundPlan}
        onHide={handleCloseModalOutboundPlan}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Shipment Plan - PO 12345 Rokok A</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="tujuan" className="mt-3">
              <Form.Label>Tujuan</Form.Label>
              <Form.Control as="select">
                <option value="">Pilih Tujuan</option>
                <option value="A">DC A</option>
                <option value="B">DC B</option>
                <option value="C">DC C</option>
                <option value="D">DC D</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="deliveryDate" className="mt-3">
              <Form.Label>Tanggal Pengiriman</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group controlId="remarks" className="mt-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control as="textarea" {...register("remarks")} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-5">
          <div></div>
          <Button variant="primary">Send Request</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Info */}
      <Modal show={showModalInfo} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Outbound Planning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. Display informasi data mengenai adanya PO dan Create shipment
            Plan yang dibuat SCM-planner
          </p>
          <p>
            2. Data shipment Plan yang dibuat SCM-planner, akan masuk kedalam
            Principal Outbound Planning
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateOutboundPlanning;
