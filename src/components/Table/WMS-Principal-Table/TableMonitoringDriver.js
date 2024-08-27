import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";

import "datatables.net-select-bs5";

import "../../../styling/Table-Custom.css";

function TableMonitoringDriver({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      requestNumber: "RN-123",
      jenisRokok: "Rokok A",
      quantity: 200,
      uom: "CRTN",
      tujuan: "WHS-A",
      status: "requesting",
    },
    {
      id: 2,
      requestNumber: "RN-123",
      jenisRokok: "Rokok A",
      quantity: 200,
      uom: "CRTN",
      tujuan: "WHS-B",
      status: "requesting",
    },
    {
      id: 3,
      requestNumber: "RN-123",
      jenisRokok: "Rokok A",
      quantity: 200,
      uom: "CRTN",
      tujuan: "WHS-A",
      status: "on the way",
    },
    {
      id: 4,
      requestNumber: "RN-123",
      jenisRokok: "Rokok A",
      quantity: 200,
      uom: "CRTN",
      tujuan: "DC-WHS",
      status: "requesting",
    },
    {
      id: 5,
      requestNumber: "RN-123",
      jenisRokok: "Rokok A",
      quantity: 200,
      uom: "CRTN",
      tujuan: "WHS-A",
      status: "on the way",
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
        { data: "requestNumber", title: "Request Number" },
        { data: "jenisRokok", title: "Jenis Rokok" },
        { data: "quantity", title: "Quantity" },
        { data: "uom", title: "UOM" },
        { data: "tujuan", title: "Tujuan" },
        { data: "status", title: "status" },
      ],
      columnDefs: [
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

export default TableMonitoringDriver;
