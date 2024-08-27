import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "../../styling/Table-Custom.css";

import { Table, Modal, Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

function TableUserComponent({ tableRef }) {
  const [dataUser, setDataUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const table = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useLayoutEffect(() => {
    $.fn.dataTable.ext.errMode = "none";
    $.DataTable = require("datatables.net-bs5");

    table.current = $("#table-react").DataTable({
      dom: "lBfrtip",
      destroy: true,
      processing: true,
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      responsive: true,
      stateSave: true,
      displayLength: "All",
      pageLength: 5,
      serverSide: false,
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, "All"],
      ],
      buttons: [
        {
          text: "CSV (Tab)",
          extend: "csvHtml5",
          fieldSeparator: "\t",
          title: "Data_Export",
          exportOptions: {
            orthogonal: "export",
            decodeEntities: false,
            columns: [0, 1, 2, 3],
          },
        },
        {
          text: "CSV (Semicolon)",
          extend: "csvHtml5",
          fieldSeparator: ";",
          title: "Data_Export",
          exportOptions: {
            orthogonal: "export",
            decodeEntities: false,
            columns: [0, 1, 2, 3],
          },
        },
        {
          text: "CSV (Comma)",
          extend: "csvHtml5",
          fieldSeparator: ",",
          title: "Data_Export",
          exportOptions: {
            orthogonal: "export",
            decodeEntities: false,
            columns: [0, 1, 2, 3],
          },
        },
      ],
      ajax: {
        type: "GET",
        url: "http://localhost:3001/api/get-users",
        dataSrc: "data",
      },
      columns: [
        { data: "id", title: "Id" },
        { data: "name", title: "Name" },
        { data: "email", title: "Email" },
        { data: "role", title: "Role" },
        { data: "action", title: "Action" },
      ],
      columnDefs: [
        {
          targets: ["id"],
          render: function (data, type, full, meta) {
            if (data == undefined || data == null) {
              return "";
            } else {
              return "<div class='text-left'>" + data + "</div>";
            }
          },
          searchable: true,
          orderable: true,
        },
        {
          targets: ["action"],
          render: function (data, type, full, meta) {
            return `
              <div class="text-center">
                <Button class="btn btn-sm btn-primary edit-button" data-id="${full.id}"><i class="fas fa-edit"></i></Button>
                <Button class="btn btn-sm btn-danger delete-button" data-id="${full.id}"><i class="fas fa-trash"></i></Button>
              </div>
            `;
          },
        },
      ],
      language: {
        paginate: {
          first: "<i class='fas fa-angle-double-left'></i>",
          last: "<i class='fas fa-angle-double-right'></i>",
          previous: "<i class='fas fa-angle-left'></i>",
          next: "<i class='fas fa-angle-right'></i>",
        },
      },
    });

    // Tangkap klik event di dalam komponen React
    $("#table-react").on("click", ".edit-button", function () {
      const id = $(this).data("id");
      handleEditClick(id);
    });

    $("#table-react").on("click", ".delete-button", function () {
      const id = $(this).data("id");
      handleDeleteClick(id);
    });

    if (tableRef.current) {
      tableRef.current = table.current;
    }

    return () => {
      table.current.destroy();
    };
  }, []);

  useEffect(() => {
    // Reset form data when showModal state changes to false
    if (!showModal) {
      reset(); // Reset react-hook-form state
    }
  }, [showModal, reset]);

  // OPEN MODAL
  const handleEditClick = async (id) => {
    setSelectedItemId(id);
    setShowModal(true);

    try {
      const response = await fetch(
        `http://localhost:3001/api/get-users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res_data = await response.json();
      console.log("res_data", res_data.data);

      setDataUser(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit UPDATE DATA
  const onSubmit = async (data) => {
    setShowModal(false);
    setSelectedItemId(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${selectedItemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log("responseData", responseData);

      if (table.current) {
        table.current.ajax.reload(null, false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (dataUser) {
      setValue("name", dataUser.name || "");
      setValue("email", dataUser.email || "");
    }
  }, [dataUser, setValue]);

  // DELETE FUNCTION
  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("responseData", responseData);

      if (table.current) {
        table.current.ajax.reload(null, false);
      }

      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  return (
    <>
      <Modal show={showModal} scrollable>
        <Modal.Header>
          <Modal.Title>Edit Item Id {selectedItemId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <div className="alert alert-danger">Name is required</div>
              )}
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email.message}</div>
              )}
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters long",
                  },
                  validate: (value) =>
                    !/\s/.test(value) || "Password should not contain spaces",
                })}
              />
              {errors.password && (
                <div className="alert alert-danger">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>

            <br></br>
            <br></br>

            <div className="row mt-3">
              <div className="col">
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </div>
              <div className="col">
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* Indikator loading */}
      {loading && (
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </>
  );
}

export default TableUserComponent;
