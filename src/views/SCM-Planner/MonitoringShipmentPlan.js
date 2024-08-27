import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/SCM-Planner-Table/TableMonitoringShipmentPlan";
import "../../styling/Table-Custom.css";

function MonitoringShipmentPlan() {
  const tableRef = useRef(null);

  // MODAL info
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
          Monitoring Shipment Plan
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="nomor_po">Nomor PO</th>
              <th className="dc_tujuan">DC Tujuan</th>
              <th className="remarks">Remarks</th>
              <th className="status">Status</th>
            </tr>
          </thead>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title> Monitoring Shipment Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              1. Mendisplay informasi Shipment Plan Request, dan menampilkan
              statusnya, apakah masih on-request, pick-up atau on-the-way
              (status disini hanya asumsi pembuat).
            </p>
            <p>
              2. Informasi disini berdasarakan hasil Action dari WHS-Principal
              dan TMS-Planner yang telah menerima Shipment Request.
            </p>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MonitoringShipmentPlan;
