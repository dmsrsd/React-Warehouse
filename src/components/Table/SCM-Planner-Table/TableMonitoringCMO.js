import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-select-bs5";

import "../../../styling/Table-Custom.css";

function TableMonitoringCMO({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      cmo_req_num: "CMO-331 A",
      jenisRokok: "Rokok A",
      quantity: 10,
      remarks: "Remarks for Rokok A",
      status: "Approved",
    },
    {
      id: 2,
      cmo_req_num: "CMO-331 B",
      jenisRokok: "Rokok B",
      quantity: 20,
      remarks: "Remarks for Rokok B",
      status: "Approved",
    },
    {
      id: 3,
      cmo_req_num: "CMO-331 B",
      jenisRokok: "Rokok C",
      quantity: 30,
      remarks: "Remarks for Rokok C",
      status: "Reject",
    },
    {
      id: 4,
      cmo_req_num: "CMO-331 C",
      jenisRokok: "Rokok D",
      quantity: 40,
      remarks: "Remarks for Rokok D",
      status: "Approved",
    },
    {
      id: 5,
      cmo_req_num: "CMO-331 C",
      jenisRokok: "Rokok E",
      quantity: 50,
      remarks: "Remarks for Rokok E",
      status: "Reject",
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
        { data: "cmo_req_num", title: "CMO Request Number" },
        { data: "jenisRokok", title: "Jenis Rokok" },
        { data: "quantity", title: "Quantity" },
        { data: "status", title: "Status" },
        { data: "remarks", title: "Remarks" },
      ],
      columnDefs: [
        {
          targets: ["status"],
          render: function (data, type, full, meta) {
            if (data == "Approved") {
              return (
                "<div style='color: green;' class ='text-center'>" +
                data +
                "</div>"
              );
            } else {
              return (
                "<div style='color: red;' class ='text-center'>" +
                data +
                "</div>"
              );
            }
          },
          searchable: true,
          orderable: true,
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
    });

    if (tableRef.current) {
      tableRef.current = table.current;
    }

    return () => {
      table.current.destroy();
    };
  }, []);
}

export default TableMonitoringCMO;
