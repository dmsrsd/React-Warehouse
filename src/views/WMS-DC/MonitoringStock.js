import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/WMS-DC-Table/TableMonSctock";
import "../../styling/Table-Custom.css";

function MonitoringSctok() {
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
          Inventory List
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="nama_rokok">Nama Rokok</th>
              <th className="existing_stock">Stock Tersedia</th>
              <th className="incoming_stock">Incoming Stock </th>
              <th className="outcoming_stock">Outcoming Stock</th>
            </tr>
          </thead>
        </Table>

        {/* MODAL INFO */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title> Monitoring Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              1. Pada menu ini beisi informasi stock/inventory setelah user
              WHS-DC put away sesuai dengan pengelompokan barangnya setelah
              melakukan Stock Opname menggunakan Mobile App.
            </p>
            <p>
              2. Data yang terdisplay hanya asumsi pembuat dengan dummy data,
              kedepan akan menyesuaikan dengan real data.
            </p>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MonitoringSctok;
