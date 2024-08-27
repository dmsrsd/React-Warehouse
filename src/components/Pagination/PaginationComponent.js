import React from "react";
import { Row, Col, Pagination as BootstrapPagination } from "react-bootstrap";

const PaginationComponent = ({
  currentPage,
  totalPages,
  paginate,
  loading,
  renderPaginationItems,
}) => {
  return (
    <Row>
      <Col className="text-right">
        <BootstrapPagination>
          <BootstrapPagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          />
          {renderPaginationItems()}
          <BootstrapPagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={loading || currentPage === totalPages}
          />
        </BootstrapPagination>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
