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

function TableApprovalCMO({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      cmo_req_num: "CMO-331 A",
    },
    {
      id: 2,
      cmo_req_num: "CMO-331 B",
    },
    {
      id: 3,
      cmo_req_num: "CMO-331 C",
    },
    {
      id: 4,
      cmo_req_num: "CMO-331 D",
    },
    {
      id: 5,
      cmo_req_num: "CMO-331 E",
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
        { data: "id", title: "" },
        { data: "cmo_req_num", title: "CMO Request Number" },
        { data: "show_detail", title: "Show Detail" },
      ],
      columnDefs: [
        {
          orderable: false,
          targets: ["id"],
          render: $.fn.dataTable.render.select(),
          className: "text-center",
        },
        {
          targets: ["show_detail"],
          render: function (data, type, full, meta) {
            return `
                <div class="text-center">
                  <Button class="btn btn-sm btn-danger detail-btn" data-id="${full.id}"><i class="fa fa-eye"></i></Button>
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
      select: {
        style: "multiple",
        selector: "td:first-child",
      },
      order: [[1, "asc"]],
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

  // OPEN MODAL
  const handleDetailClick = async (id) => {
    setModalDetail(true);
  };
  // CLOSE MODAL
  const closeModalDetail = () => {
    setModalDetail(false);
  };

  return (
    <>
      <Modal show={showModalDetail} scrollable size="lg">
        <Modal.Header>
          <Modal.Title>Detail Request : CMO-331 A</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Jenis Rokok</th>
                <th>Qty</th>
                <th>UOM</th>
                <th>Request From</th>
                <th>Tujuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rokok A</td>
                <td>100</td>
                <td>CRTN</td>
                <td>Principal</td>
                <td>DC-WHS-B</td>
              </tr>
              <tr>
                <td>Rokok B</td>
                <td>200</td>
                <td>CRTN</td>
                <td>Principal</td>
                <td>MAIN-WHS</td>
              </tr>
              <tr>
                <td>Rokok C</td>
                <td>50</td>
                <td>CRTN</td>
                <td>Principal</td>
                <td>DC-WHS-A</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalDetail}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleActionClick}>
            Next
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableApprovalCMO;
