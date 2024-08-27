import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableMonitoringDriver from "../../components/Table/WMS-Principal-Table/TableMonitoringDriver";
import "../../styling/Table-Custom.css";

function MonitoringDriver() {
  const tableRef = useRef(null);

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
          Monitoring Driver
        </h3>

        <TableMonitoringDriver tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="requestNumber">Request Number</th>
              <th className="jenisRokok">Jenis Rokok</th>
              <th className="quantity">quantity</th>
              <th className="uom">UOM</th>
              <th className="tujuan">Tujuan</th>
              <th className="status">Status</th>
            </tr>
          </thead>
        </Table>
      </div>

      {/* Modal Info */}
      <Modal show={showModalInfo} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Monitoring Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. Display informasi data Pickup Request, dan user bisa melihat
            perubahan Statusnya, yang mana perubahan Status ini berdasarkan
            Action dari tim TMS.
          </p>
          <p>
            2. Disini saya ber-asumsi akan adanya Request Number yang digenerate
            ketika user WMS-Principal melakukan Shipment Pickup Request,
            sehingga nanti Request Number tersebut juga ada pada pihak TMS dalam
            melanjutkan proses Pick Up Request.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MonitoringDriver;
