import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/SCM-Planner-Table/TableApprovalCMO";
import "../../styling/Table-Custom.css";

function IncomingCMO() {
  const tableRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleReasonChange = (e) => {
    setRejectReason(e.target.value);
  };

  const handleRejectSubmit = () => {
    // Call API or perform action to reject with reason
    console.log(`Reject reason: ${rejectReason}`);
    setShowModal(false);
  };

  // MODAL info
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleShowModal = () => {
    setShowModalInfo(true);
  };

  const handleCloseModal = () => {
    setShowModalInfo(false);
  };

  return (
    <>
      <div className="container">
        <h3 className="mb-4" onClick={handleShowModal}>
          Approval Incoming CMO
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id"></th>
              <th className="cmo_req_number">CMO List</th>
              <th className="show_detail">Details</th>
            </tr>
          </thead>
        </Table>

        <div className="d-flex justify-content-center mt-5 mb-2">
          <Button className="mr-2">Approve</Button>
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Reject Reason</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="rejectReason">
              <Form.Label>Reason for rejection:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={rejectReason}
                onChange={handleReasonChange}
                className="form-control-lg"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRejectSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Info */}
      <Modal show={showModalInfo} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Approval Incoming CMO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. CMO Request dari SCM-Planner akan ditampilkan kedalam tabel data,
            dan bisa melihat detail data tersebut selanjutnya User WHS-principal
            bisa melakukan proses Approval atau Rejection.
          </p>
          <p>
            2. Jika CMO Request di-Approve/Reject maka di Monitoring CMO milik
            SCM-Planner akan ter-update statusnya sesuai proses yang dilakukan
            User WHS-Principal.
          </p>
          <p>
            3. Jika User WHS-Principal melakukan Rejection, wajib mengisi Reason
            for rejection.
          </p>
          <p>
            4. Semua proses yang dilakukan oleh User disini akan masuk juga
            kedalam Oracle dan nantinya digunakan untuk membuat PO/PR dan
            menghasilkan List Data PO yang digunakan oleh SCM-Planner dalam
            Entry Shipment Plan.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default IncomingCMO;
