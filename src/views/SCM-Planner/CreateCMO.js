import { useForm } from "react-hook-form";
import { Form, Button, FormControl, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const jenisRokokOptions = [
  { value: "Rokok A", label: "Rokok A" },
  { value: "Rokok B", label: "Rokok B" },
  { value: "Rokok C", label: "Rokok C" },
  { value: "Rokok D", label: "Rokok D" },
  { value: "Rokok E", label: "Rokok E" },
  { value: "Rokok F", label: "Rokok F" },
];

export default function CreateCMOForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log("jenisRokokOptions", jenisRokokOptions);
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4" onClick={handleShowModal}>
        Create CMO
      </h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="jenisRokok" className="mt-3">
          <Form.Label>Jenis Rokok</Form.Label>
          <FormControl
            as="select"
            {...register("jenisRokok", { required: true })}
            className="mt-3"
          >
            <option value="">Select</option>
            {jenisRokokOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormControl>
          {errors.jenisRokok && (
            <p className="alert alert-danger">Jenis Rokok is required !</p>
          )}
        </Form.Group>

        <Form.Group controlId="quantity" className="mt-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            {...register("quantity", { required: true, min: 1 })}
          />
          {errors.quantity && (
            <p className="alert alert-danger">Quantity Rokok is required !</p>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Customer Monthly Order (CMO)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>1. SCM staff membuat Customer Monthly Order (CMO).</p>
          <p>2. Meng-entry Jenis Rokok/SKU, Quantity.</p>
          <p>3. Lalu CMO request akan terkirim ke WHS Principal (masuk Incoming CMO).</p>
          <p>4. Selanjutnya WHS-principal akan melakukan pengecekan ketersediaan stock, dan akan meng-Approve atau Reject CMO Request tersebut.</p>         
        </Modal.Body>
      </Modal>
    </div>
  );
}
