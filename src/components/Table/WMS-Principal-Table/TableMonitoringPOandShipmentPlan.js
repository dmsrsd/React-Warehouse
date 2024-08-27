import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-select-bs5";

import "../../../styling/Table-Custom.css";

function TableMonitoringPOandShipmentPlan({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      no_po: "12345 Rokok A",
      dc_tujuan: "DC A",
      remarks: "Remarks for 12345 Rokok A",
      status: "Request",
    },
    {
      id: 2,
      no_po: "12345 Rokok B",
      dc_tujuan: "DC B",
      remarks: "Remarks for 12345 Rokok B",
      status: "Request",
    },
    {
      id: 3,
      no_po: "12345 Rokok C",
      dc_tujuan: "DC C",
      remarks: "Remarks for 12345 Rokok C",
      status: "Request",
    },
    {
      id: 4,
      no_po: "12345 Rokok D",
      dc_tujuan: "DC D",
      remarks: "Remarks for 12345 Rokok D",
      status: "Request",
    },
    {
      id: 5,
      no_po: "12345 Rokok E",
      dc_tujuan: "DC E",
      remarks: "Remarks for 12345 Rokok E",
      status: "Request",
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
        { data: "id", title: "" },
        { data: "no_po", title: "Nomor PO" },
        { data: "dc_tujuan", title: "DC Tujuan" },
        { data: "remarks", title: "Remarks" },
        { data: "status", title: "Status" },
      ],
      columnDefs: [
        {
          orderable: false,
          targets: ["id"],
          render: $.fn.dataTable.render.select(),
          className: "text-center",
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

    return () => {
      table.current.destroy();
    };
  }, []);
}

export default TableMonitoringPOandShipmentPlan;
