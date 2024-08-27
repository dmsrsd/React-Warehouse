import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/TMS-Planner-Table/TablePickUpRequest";
import "../../styling/Table-Custom.css";

function PickUpRequest() {
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
          Pickup Request Handling
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="pickUpNumber">Request Doc Number</th>
              <th className="requestFrom">Request From</th>
              <th className="checkDetail">Assign Truck & Driver</th>
            </tr>
          </thead>
        </Table>
      </div>

      {/* Modal Info */}
      <Modal show={showModalInfo} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Monitoring PO & Shipment Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. Display informasi data mengenai adanya Request Pickup. User TMS
            bisa melihat Request berasal darimana, dan check Detail berdasarkan
            Nomor Request Number.
          </p>
          <p>
            2. Dalam Check Detail, berisi informasi barang berdasarkan nomor PO,
            Request From, serta Tujuan Pengiriman.
          </p>
          <p>
            3. Dalam Modal Detail Request yang berdasarkan Request Number, user
            TMS bisa melanjutakan keproses berikutnya yaitu proses Setup Picking
            Request.
          </p>
          <p>
            4. Didalam Setup Picking Request, user TMS bisa memilih jenis
            Kendaraan, Driver, Tujuan, serta Tanggal pengiriman sesuai Request
            Pickup dari tim WHS.
          </p>
          <p>
            5. Setelah mengisi dengan lengkap Setup Picking Request, user TMS
            bisa submit data. Data ini akan mempengaruhi update data di
            Monitoring Shipment Plan milik tim SCM-Planner, dan Monitoring
            Driver di tim WHS-Principal. Juga sudah otomatis masuk ke Oracle.
          </p>
          <p>
            6. Proses Submit Picking Request tadi akan dilanjutkan ke pencetakan
            Surat Jalan, sebagai Bukti Driver untuk melakukan Pick Up Barang
            berdasarkan Request Number yang berisi PO.
          </p>
          <p>
            7. Dalam Kasus diatas yang telah dijelaskan adalah kondisi jika
            Tersedia semua oleh pihak Internal. Maka jika tersedia, akan ada
            proses Manual tim TMS menggunakan pihak ke-3.
          </p>
          <p>
            8. Lalu Proses selanjutnya adalah Driver menggunakan Mobile-App
            untuk proeses Loading, Pickup Barang dan tanda tangan dokumen yang
            dibutuhkan. Nantinya dari proses ini akan menghasilkan Inbound
            Planning Number yang di auto-generate by sistem. Dan datanya akan
            digunakan didalam Inbound Planning WMS-DC.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PickUpRequest;
