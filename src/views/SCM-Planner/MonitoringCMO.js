import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/SCM-Planner-Table/TableMonitoringCMO";
import "../../styling/Table-Custom.css";

function MonitoringCMO() {
  const tableRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="container">
        <h3 className="mb-4" onClick={handleShowModal}>
          Monitoring CMO
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="cmo_rq_num">CMO Request Number</th>
              <th className="jenisRokok">Jenis Rokok</th>
              <th className="quantity">Quantity</th>
              <th className="status">Status</th>
              <th className="remarks">Remarks</th>
            </tr>
          </thead>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Monitoring CMO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. Hasil CMO Request yang telah diajukan akan terdisplay disini, yang mana user bisa
            melihat CMO Request di Approve atau Reject oleh WHS Principal.
          </p>
          <p>
            2. Ketika CMO Request telah di Approve oleh WHS-Principal, User bisa melakukan proses Entry Shipment Plan.
          </p>
          <p>
            3. Informasi disini berdasarkan Approval atau Rejection WHS-Principal.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MonitoringCMO;
