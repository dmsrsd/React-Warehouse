import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import TableUserComponent from "../../components/Table/WMS-DC-Table/TableInboundPlanning";
import "../../styling/Table-Custom.css";

function InboundPlanning() {
  const tableRef = useRef(null);

  // MODAL info
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // MODAL Print Sticker
  const [showModalSticker, setModalSticker] = useState(false);

  const modalPrintSticker = () => {
    setModalSticker(true);
  };

  const clsMdlPrintSticker = () => {
    setModalSticker(false);
  };

  // Dummy Data
  const productData = {
    sku: "SKU123",
    produksiDate: "2023-11-22",
    kedatanganDate: "2023-11-25",
    expiredDate: "2024-11-24",
    lokasi: "Zona A",
  };

  return (
    <>
      <div className="container">
        <h3 className="mb-4" onClick={handleShowModal}>
          Inbound Planning
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id"></th>
              <th className="inplan_num">Inbound Planning No</th>
              <th className="no_po">Nomor PO</th>
              <th className="plan_delivery_date">Plan Delivery Date</th>
              <th className="principle">Principle</th>
              <th className="jenis_inbound">Jenis Inbound</th>
            </tr>
          </thead>
        </Table>

        <div className="d-flex justify-content-center mt-5 mb-2">
          <Button className="mr-2" onClick={modalPrintSticker}>
            Print Sticker
          </Button>
          {/* <Button variant="danger">Reject</Button> */}
        </div>

        {/* MODAL PRINT STICKER */}
        <Modal show={showModalSticker} onHide={clsMdlPrintSticker} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Print Sticker</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama SKU</Form.Label>
                <Form.Control type="text" value={productData.sku} disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tanggal Produksi</Form.Label>
                <Form.Control
                  type="date"
                  value={productData.produksiDate}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tanggal Kedatangan</Form.Label>
                <Form.Control
                  type="date"
                  value={productData.kedatanganDate}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Expired Date</Form.Label>
                <Form.Control
                  type="date"
                  value={productData.expiredDate}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Penempatan Lokasi</Form.Label>
                <Form.Control as="select" value={productData.lokasi} disabled>
                  <option>Zona A</option>
                  <option>Zona B</option>
                </Form.Control>
              </Form.Group>
              {/* Tambahkan inputan lainnya sesuai kebutuhan */}
            </Form>
            <br></br>
            <br></br>

            <Button className="mb-5">Print</Button>
          </Modal.Body>
        </Modal>


        

        {/* MODAL INFO */}
        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Inbound Planning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              1. Pada menu ini beisi informasi Inbound Planning yang telah
              dikirim oleh Driver. Lalu pihak WHS-DC mempersiapkan untuk proses
              unloading barang.
            </p>
            <p>
              2. Pada list data Inbound Planning user bisa memilih Jenis
              Inbound-nya. Jika jenis Inbound-nya adalah Good, maka akan
              dilanjutkan ke proses print Incoming Sticker.
            </p>
            <p>
              3. Jika jenis Inbound-nya adalah Retur, user WHS-DC akan melakukan
              proses manual dengan menggunakan WH-Mobile-App untuk Unloading
              Scan-in, Jika Sesuai/OK selanjutnya user melakukan Put Away di
              Retur-Area (DC Retur). Dan datanya akad ter-display di Dashboard
              Retur.
            </p>
            <p>
              4. Jika jenis Inbound-nya adalah Retur, namun Tidak Sesuai/NOT OK
              maka User akan membuat Berita Acara Ketidak sesuaian (Jumlah/
              kondisi) serta mengambil bukti Foto menggunakan WH-Mobile-App. Dan
              akan masuk kedalam Oracle?.
            </p>
            <p>
              5. Menu Inbound Planning berdasarkan flowchart, sejauh ini hanya
              sebatas itu. (bisa berubah/berkembang dikemudian hari).
            </p>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default InboundPlanning;
