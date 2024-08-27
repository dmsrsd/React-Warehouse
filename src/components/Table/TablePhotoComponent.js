import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "../../styling/Table-Custom.css";

function TablePhotoComponent({ tableRef }) {
  const table = useRef(null);

  useLayoutEffect(() => {
    $.fn.dataTable.ext.errMode = "none";
    $.DataTable = require("datatables.net-bs5");

    table.current = $("#table-react").DataTable({
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
      ajax: {
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/photos",
        dataSrc: function (json) {
          if (Array.isArray(json)) {
            return json;
          } else {
            console.error("Invalid data format received:", json);
            return [];
          }
        },
      },
      columns: [
        { data: "id", title: "Id" },
        { data: "title", title: "Title" },
        { data: "url", title: "URL" },
        { data: "thumbnailUrl", title: "thumbnailUrl" },
      ],
      columnDefs: [
        {
          targets: ["id"],
          render: function (data, type, full, meta) {
            console.log("data_", data);

            if (data == undefined || data == null) {
              return "";
            } else {
              return "<div class='text-center'>" + data + "</div>";
            }
          },
          searchable: true,
          orderable: true,
        },
        {
          targets: ["thumbnailUrl"],
          render: function (data, type, full, meta) {
            console.log("data_", data);

            if (data == undefined || data == null) {
              return "";
            } else {
              return `<div class='text-center'><img src="${data}" alt="Thumbnail" class="img-thumbnail" style="max-width: 100px;" /></div>`;
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

export default TablePhotoComponent;
