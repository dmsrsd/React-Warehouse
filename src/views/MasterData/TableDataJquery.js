import React, { useRef } from "react";
import { Table } from "react-bootstrap";
import TableUserComponent from "../../components/Table/TableUserComponent";
import "../../styling/Table-Custom.css";

function TableData() {
  const tableRef = useRef(null);

  return (
    <>
      <TableUserComponent tableRef={tableRef} />
      <Table bordered striped responsive id="table-react" className="display">
        <thead>
          <tr>
            <th className="id">Id</th>
            <th className="name">Name</th>
            <th className="email">Email</th>
            <th className="role">Role</th>
            <th className="action">Action</th>
          </tr>
        </thead>
      </Table>
    </>
  );
}

export default TableData;
