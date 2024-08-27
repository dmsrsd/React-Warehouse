import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-select-bs5";

import "../../../styling/Table-Custom.css";

function TableInboundPlanning({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      inplan_num: "IP-555 A",
      no_po: "PO 12345 Rokok A",
      plan_delivery_date: "08-08-2024",
      principle: "Principle Rokok A",
      jenis_inbound: "Retur",
    },
    {
      id: 2,
      inplan_num: "IP-555 B",
      no_po: "PO 12345 Rokok B",
      plan_delivery_date: "08-08-2024",
      principle: "Principle Rokok B",
      jenis_inbound: "Good",
    },
    {
      id: 3,
      inplan_num: "IP-555 C",
      no_po: "PO 12345 Rokok C",
      plan_delivery_date: "08-08-2024",
      principle: "Principle Rokok C",
      jenis_inbound: "Good",
    },
    {
      id: 4,
      inplan_num: "IP-555 D",
      no_po: "PO 12345 Rokok D",
      plan_delivery_date: "08-08-2024",
      principle: "Principle Rokok D",
      jenis_inbound: "Retur",
    },
    {
      id: 5,
      inplan_num: "IP-555 E",
      no_po: "PO 12345 Rokok E",
      plan_delivery_date: "08-08-2024",
      principle: "Principle Rokok E",
      jenis_inbound: "Good",
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
        { data: "inplan_num", title: "Inbound Plan Number" },
        { data: "no_po", title: "Nomor PO" },
        { data: "plan_delivery_date", title: "Plan Delivery Date" },
        { data: "principle", title: "Principle" },
        { data: "jenis_inbound", title: "Jenis Inbound" },
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

export default TableInboundPlanning;
