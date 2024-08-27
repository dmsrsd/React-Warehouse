import React from "react";
import { Table, Dropdown } from "react-bootstrap";

const TableComponent = ({
  tableData,
  handlePerPageChange,
  itemsPerPage,
  columns,
}) => {
  
  // Function to check if a column is an image column
  const isImageColumn = (column) => {
    return column.accessor === "thumbnailUrl" || column.isImage;
  };

  
  // Function to get value from nested objects
  const getNestedValue = (obj, accessor) => {
    const keys = accessor.split("."); // Split accessor by '.'
    return keys.reduce((value, key) => (value ? value[key] : undefined), obj);
  };

  return (
    <>
      <Dropdown className="text-right mb-3 p-2">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Show {itemsPerPage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handlePerPageChange(10)}>
            10 per page
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePerPageChange(25)}>
            25 per page
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePerPageChange(50)}>
            50 per page
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePerPageChange("All")}>
            All
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table className="table-hover table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border-0">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {isImageColumn(column) ? (
                    <img
                      src={getNestedValue(item, column.accessor)}
                      alt={item.title} // Sesuaikan dengan field yang sesuai di data Anda
                      style={{ width: "50px", height: "auto" }}
                    />
                  ) : (
                    getNestedValue(item, column.accessor)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;
