import React, { useRef } from "react";
import { Button, Container, Row, Col, Form, Table } from "react-bootstrap";
import TablePhotoComponent from "../../components/Table/TablePhotoComponent";
import "../../styling/Table-Custom.css";

const TablePhoto = () => {
  const tableRef = useRef(null);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Scan Barcode</Form.Label>
            <Row>
              <Col xs={6}>
                <Form.Control placeholder="Input Barcode" />
              </Col>
              <Col xs={6}>
                <Button
                  className="btn-fill pull-right"
                  type="button"
                  variant="info"
                  onClick={() => fetchData(itemsPerPage, currentPage)}
                >
                  Submit Barcode
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
      <br />
      <br />
      <TablePhotoComponent tableRef={tableRef} />
      <Table bordered striped responsive id="table-react" className="display">
        <thead>
          <tr>
            <th className="id">Id</th>
            <th className="title">Title</th>
            <th className="url">URL</th>
            <th className="thumbnailUrl">thumbnailUrl</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
};

export default TablePhoto;
