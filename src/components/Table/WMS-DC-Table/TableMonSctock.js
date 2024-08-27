import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-select-bs5";

import "../../../styling/Table-Custom.css";

function TableMonStock({ tableRef }) {
  const table = useRef(null);

  const data = [
    {
      id: 1,
      nama_rokok: "Rokok A",
      existing_stock: 100,
      incoming_stock: 300,
      outcoming_stock: 150,
    },
    {
      id: 2,
      nama_rokok: "Rokok B",
      existing_stock: 100,
      incoming_stock: 200,
      outcoming_stock: 200,
    },
    {
      id: 3,
      nama_rokok: "Rokok C",
      existing_stock: 100,
      incoming_stock: 200,
      outcoming_stock: 200,
    },
    {
      id: 4,
      nama_rokok: "Rokok D",
      existing_stock: 100,
      incoming_stock: 200,
      outcoming_stock: 150,
    },
    {
      id: 5,
      nama_rokok: "Rokok E",
      existing_stock: 100,
      incoming_stock: 200,
      outcoming_stock: 200,
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
        { data: "nama_rokok", title: "Nama Rokok" },
        { data: "existing_stock", title: "Existing Stock" },
        { data: "incoming_stock", title: "Incoming Stock" },
        { data: "outcoming_stock", title: "Outcoming Stock" },
      ],
      columnDefs: [
        // {
        //   orderable: false,
        //   targets: ["id"],
        //   render: $.fn.dataTable.render.select(),
        //   className: "text-center",
        // },
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

    return () => {
      table.current.destroy();
    };
  }, []);
}

export default TableMonStock;
