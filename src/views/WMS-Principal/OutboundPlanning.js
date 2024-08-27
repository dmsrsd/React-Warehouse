import React, { useRef, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TableUserComponent from "../../components/Table/WMS-Principal-Table/TableMonitoringPOandShipmentPlan";
import "../../styling/Table-Custom.css";

function OutboundPlanning() {
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

  // MODAL PICKUP REQUEST
  const [showModalPickupReq, setModalPickupReq] = useState(false);

  const openMdlPickupReq = () => {
    setShowModalOutboundPlan(false);
    setModalPickupReq(true);
  };

  const clsMdlPickupReq = () => {
    setModalPickupReq(false);
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
          List Sales Order SCM
        </h3>

        <TableUserComponent tableRef={tableRef} />

        <Table bordered striped responsive id="table-react" className="display">
          <thead>
            <tr>
              <th className="id"></th>
              <th className="nomor_po">Nomor</th>
              <th className="dc_tujuan">DC Tujuan</th>
              <th className="remarks">Remarks</th>
              <th className="status">Status</th>
            </tr>
          </thead>
        </Table>

        <div className="d-flex justify-content-center mt-5 mb-2">
          <Button className="mr-2" onClick={handleModalOutboundPlan}>
            Create Outbound Plan
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
          <Modal.Title>Cerate acking List - 12345 Rokok A</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="sku_item" className="mt-3">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                {...register("sku_item", { required: true, min: 1 })}
              />
              {errors.sku_item && (
                <p className="alert alert-danger">SKU Rokok is required !</p>
              )}
            </Form.Group>

            <Form.Group controlId="quantity" className="mt-3">
              <Form.Label>Total Dus</Form.Label>
              <Form.Control
                type="number"
                {...register("quantity", { required: true, min: 1 })}
              />
              {errors.quantity && (
                <p className="alert alert-danger">
                  Total Dus Rokok is required !
                </p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-5">
          <div></div>
          <Button variant="primary" onClick={openMdlPickupReq}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Pickup Request */}
      <Modal show={showModalPickupReq} onHide={clsMdlPickupReq} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Pickup Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="jenis_kendaraan" className="mt-3">
              <Form.Label>Jenis kendaraan</Form.Label>
              <Form.Control
                as="select"
                {...register("jenis_kendaraan", { required: true })}
              >
                <option value="">Pilih jenis kendaraan</option>
                <option value="Truck">Truck A</option>
                <option value="Truck">Truck B</option>
                <option value="Truck">Truck C</option>
              </Form.Control>
              {errors.jenis_kendaraan && (
                <p className="alert alert-danger">is required !</p>
              )}
            </Form.Group>

            <Form.Group controlId="quantity" className="mt-3">
              <Form.Label>Tanggal Pengiriman</Form.Label>
              <Form.Control
                type="date"
                {...register("date", { required: true, min: 1 })}
              />
              {errors.date && (
                <p className="alert alert-danger">Date Rokok is required !</p>
              )}
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
            1. Data plan shipment per masing-masing DC yang di buat oleh SCM
            akan muncul di Sales Order Principal.
          </p>
          <p>
            2. Dari List Data PO & Shipment Plan ini, User bisa membuat Outbound
            Planning, yang nanti request ini akan diteruskan ke pihak terkait.
          </p>
          <p>
            3. Dengan mengirimkan Pick Up Request ke TMS, pihak TMS akan
            memastikan dan menyiapkan kendaraan yang sesuai dengan detail/isi PO
            tersebut yang telah direquest.
          </p>
          <p>
            4. Setelah Send Request, maka akan men-generate Request Number untuk
            kebutuhan Action terhadap Pickup Request yang diajukan.
          </p>
          <p>
            5. Update mengenai Pickup Request yang telah diajukan akan
            di-informasikan di menu Monitoring Driver, dan sudah ada Request
            Number.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OutboundPlanning;
