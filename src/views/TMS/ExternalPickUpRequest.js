import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/TMS-Planner-Table/TableExtPickUpRequest";
import "../../styling/Table-Custom.css";

function ExternalPickUpRequest() {
  const tableRef = useRef(null);

  // MODAL info
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleShowModal = () => {
    setShowModalInfo(true);
  };

  const handleCloseModal = () => {
    setShowModalInfo(false);
  };

  // MODAL Outbou

  return (
    <>
      <div className="container">
        <h3 className="mb-4" onClick={handleShowModal}>
          External Pickup Request Handling
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="pickUpNumber">Request Doc Number</th>
              <th className="requestFrom">Request From</th>
              <th className="checkDetail">Check Detail</th>
            </tr>
          </thead>
        </Table>
      </div>

      {/* Modal Info */}
      <Modal show={showModalInfo} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Monitoring PO & Shipment Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. Untuk Proses menggunakan pihak-3 hampir sama dengan menu Pickup
            Request Internal. Namun bedanya adalah pada saat Setup Picking
            Request.
          </p>
          <p>
            2. Setup Picking Request, bisa di isi Manual dari nama Driver, No
            Kendaran, No Tlp Driver, Nama Vendor, No Tlp Vendor, Uang Jalan,
            Tanggal pengiriman. Inputan disesuakan dengan kesepakatam tim TMS
            dangan pihak ke-3.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExternalPickUpRequest;
