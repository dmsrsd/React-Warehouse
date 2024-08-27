import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Pagination,
} from "react-bootstrap";

import TableComponent from "../../components/Table/TableComponent";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

function TableData() {
  // Define a state to hold your table data
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (perPage = itemsPerPage, page = currentPage) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${perPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTableData(data);

      const totalCountResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const totalCount = await totalCountResponse.json();
      const totalPagesCount = Math.ceil(totalCount.length / perPage);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePerPageChange = async (perPage) => {
    setLoading(true);
    if (perPage === "All") {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        perPage = data.length; // Set perPage menjadi jumlah data yang ada
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setItemsPerPage(perPage);
    setCurrentPage(1);
    setTableData([]); // Kosongkan data sebelum fetching baru

    fetchData(perPage);
  };

  const renderPaginationItems = () => {
    const numPagesToShow = 3; // Jumlah tombol halaman yang akan ditampilkan di sekitar halaman aktif
    const startPage = Math.max(1, currentPage - Math.floor(numPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + numPagesToShow - 1);

    const items = [];
    for (let number = startPage; number <= endPage; number++) {
      let className = number === currentPage ? "active" : "";
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => paginate(number)}
          className={className}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Website", accessor: "website" },
    {
      header: "Street",
      accessor: "address.street",
      isNested: true, // Menandakan bahwa kolom ini merupakan kolom yang bersarang
    },
    {
      header: "City",
      accessor: "address.city",
      isNested: true, // Menandakan bahwa kolom ini merupakan kolom yang bersarang
    },
    {
      header: "Zipcode",
      accessor: "address.zipcode",
      isNested: true, // Menandakan bahwa kolom ini merupakan kolom yang bersarang
    },
    {
      header: "Company Name",
      accessor: "company.name",
      isNested: true, // Menandakan bahwa kolom ini merupakan kolom yang bersarang
    },
    {
      header: "Business",
      accessor: "company.bs",
      isNested: true, // Menandakan bahwa kolom ini merupakan kolom yang bersarang
    },
  ];


  useEffect(() => {
    fetchData(itemsPerPage, currentPage);
  }, [currentPage, itemsPerPage]);

  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
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
                  >
                    Submit Barcode
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <br></br>
        <br></br>

        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users Table</Card.Title>
                <p className="card-category">List of users fetched from API</p>
              </Card.Header>

              <Card.Body className="table-full-width table-responsive px-0">
                <TableComponent
                  tableData={tableData}
                  handlePerPageChange={handlePerPageChange}
                  itemsPerPage={itemsPerPage}
                  columns={columns}
                />
              </Card.Body>

              {loading && (
                <p className="text-center">
                  <em>Loading...</em>
                </p>
              )}

              <Card.Footer className="text-right">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                  loading={loading}
                  renderPaginationItems={renderPaginationItems}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableData;
