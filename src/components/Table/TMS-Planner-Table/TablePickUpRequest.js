import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Modal, Table, Button, Form } from "react-bootstrap";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-select-bs5";

import "../../../styling/Table-Custom.css";

function TablePickUpRequest({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      pickUpNumber: "RN-123",
      requestFrom: "WMS-Principal",
      //   jenisKendaraan: "Truck A",
    },
    {
      id: 2,
      pickUpNumber: "RN-345",
      requestFrom: "WMS-DC-A",
      //   jenisKendaraan: "Truck B",
    },
    {
      id: 3,
      pickUpNumber: "RN-234",
      requestFrom: "WMS-Principal",
      //   jenisKendaraan: "Truck C",
    },
    {
      id: 4,
      pickUpNumber: "RN-777",
      requestFrom: "WMS-DC-B",
      //   jenisKendaraan: "Truck D",
    },
    {
      id: 5,
      pickUpNumber: "RN-675",
      requestFrom: "WMS-Principal",
      //   jenisKendaraan: "Truck E",
    },
  ];

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
      data: data,
      columns: [
        { data: "id", title: "Id" },
        { data: "pickUpNumber", title: "Request Doc Number" },
        { data: "requestFrom", title: "Request From" },
        { data: "checkDetail", title: "Assign Truck & Driver" },
      ],
      columnDefs: [
        // {
        //   orderable: false,
        //   targets: ["id"],
        //   render: $.fn.dataTable.render.select(),
        //   className: "text-center",
        // },
        {
          targets: ["checkDetail"],
          render: function (data, type, full, meta) {
            return `
                <div class="text-center">
                  <Button class="btn btn-sm btn-success detail-btn" data-id="${full.id}"><i class="fa fa-pen"></i></Button>
                </div>
              `;
          },
        },
        {
          targets: ["_all"],
          render: function (data, type, full, meta) {
            if (data == undefined || data == null) {
              return "";
            } else {
              return "<div class='text-center'>" + data + "</div>";
            }
          },
          searchable: true,
          orderable: true,
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
      //   select: {
      //     style: "multiple",
      //     selector: "td:first-child",
      //   },
      //   order: [[1, "asc"]],
    });

    if (tableRef.current) {
      tableRef.current = table.current;
    }

    // Tangkap klik event di dalam komponen React
    $("#table-react").on("click", ".detail-btn", function () {
      const id = $(this).data("id");
      handleDetailClick(id);
    });

    return () => {
      table.current.destroy();
    };
  }, []);

  const [showModalDetail, setModalDetail] = useState(false);
  const [showModalAction, setModalAction] = useState(false);

  // OPEN MODAL
  const handleDetailClick = async (id) => {
    setModalDetail(true);
  };
  // CLOSE MODAL
  const closeModalDetail = () => {
    setModalDetail(false);
  };

  // OPEN MODAL
  const handleActionClick = async () => {
    setModalDetail(false);
    setModalAction(true);
  };
  // CLOSE MODAL
  const closeModalAction = () => {
    setModalAction(false);
  };

  return (
    <>
      {/* Modal Detail */}
      <Modal show={showModalDetail} scrollable size="lg">
        <Modal.Header>
          <Modal.Title>Detail Request : RN-123</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nomor PO</th>
                <th>Jenis Rokok</th>
                <th>Qty</th>
                <th>UOM</th>
                <th>Request From</th>
                <th>Tujuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PO 12345 Rokok A</td>
                <td>Rokok A</td>
                <td>100</td>
                <td>CRTN</td>
                <td>Principal</td>
                <td>DC-WHS-B</td>
              </tr>
              <tr>
                <td>PO 12345 Rokok A</td>
                <td>Rokok B</td>
                <td>200</td>
                <td>CRTN</td>
                <td>Principal</td>
                <td>DC-WHS-B</td>
              </tr>
              <tr>
                <td>PO 12345 Rokok A</td>
                <td>Rokok C</td>
                <td>50</td>
                <td>CRTN</td>
                <td>Principal</td>
                <td>DC-WHS-B</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalDetail}>
            Close
          </Button>
          <Button variant="primary" onClick={handleActionClick}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAction} scrollable size="xl">
        <Modal.Header>
          <Modal.Title>Setup Picking Request : RN-123</Modal.Title>
          <Modal.Title>Internal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="vehicle" className="mt-3">
              <Form.Label>Kendaraan</Form.Label>
              <Form.Control as="select">
                <option value="">Pilih Kendaraan</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="vehicle" className="mt-3">
              <Form.Label>Driver</Form.Label>
              <Form.Control as="select">
                <option value="">Pilih Driver</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="vehicle" className="mt-3">
              <Form.Label>Tujuan</Form.Label>
              <Form.Control as="select">
                <option value="">Pilih Tujuan</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="deliveryDate" className="mt-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group controlId="deliveryDate" className="mt-3">
              <Form.Label>Tanggal Pengiriman</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-5">
          <Button variant="secondary" onClick={closeModalAction}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModalAction}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TablePickUpRequest;
