import { useForm } from "react-hook-form";
import { Form, Button, FormControl, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const dataDC = [
  { value: "DC A", label: "DC A" },
  { value: "DC B", label: "DC B" },
  { value: "DC C", label: "DC C" },
  { value: "DC D", label: "DC D" },
  { value: "DC E", label: "DC E" },
  { value: "DC F", label: "DC F" },
];

const dataPO = [
  { value: "Data PO A", label: "Data PO A" },
  { value: "Data PO B", label: "Data PO B" },
  { value: "Data PO C", label: "Data PO C" },
  { value: "Data PO D", label: "Data PO D" },
  { value: "Data PO E", label: "Data PO E" },
  { value: "Data PO F", label: "Data PO F" },
];

export default function EntryShipmentPlan() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    console.log("dataDC", dataDC);
  }, []);

  // MODAL info
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4" onClick={handleShowModal}>
        Entry Shipment Plan
      </h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="selectDC" className="mt-3">
          <Form.Label>Pilih DC</Form.Label>
          <FormControl
            as="select"
            {...register("selectDC", { required: true })}
            className="mt-3"
          >
            <option value="">Select</option>
            {dataDC.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormControl>
          {errors.selectDC && (
            <p className="alert alert-danger">Select DC is required !</p>
          )}
        </Form.Group>

        <Form.Group controlId="selectPO" className="mt-3">
          <Form.Label>Pilih Nomor PO</Form.Label>
          <FormControl
            as="select"
            {...register("selectPO", { required: true })}
            className="mt-3"
          >
            <option value="">Select</option>
            {dataPO.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormControl>
          {errors.selectPO && (
            <p className="alert alert-danger">Select PO is required !</p>
          )}
        </Form.Group>

        <Form.Group controlId="remarks" className="mt-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control as="textarea" {...register("remarks")} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Entry Shipment Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1. Hasil CMO Request yang di-Approve, dilanjutkan ke proses membuat
            PR-PO untuk order Rokok ke Principle masuk ke Oracle/ auto generate
            PR-PO dengan Oracle.
          </p>
          <p>
            2. Data tersebut di Transfer ke WMS Menu SCM Planning akan menjadi
            PO List disini.
          </p>
          <p>
            3. Kemudian User Membuat/Entry Shipment Plan untuk masing-masing DC.
          </p>
          <p>
            4. Hasil Entry Shipment Plan tersebut nantinya akan diproeses oleh
            WHS-Principal untuk cek ketersedian stok barang, dll dan TMS-Planner
            untuk ketersedian kendaraan, driver, dll. Data ini masuk kedalam
            Monitoring PO & Shipment Plans tim WMS-Principal, dan next akan
            dibuatkan Create Outbound Planning.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
