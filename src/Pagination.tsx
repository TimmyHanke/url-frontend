import React from "react";
import _ from "lodash";
import styled from "styled-components";

function Pagination({ itemCount, pageSize, selectedPage, onPageChange }: any) {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (itemCount < 11) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <Paginate>
      <ul>
        {pages.map((page) => (
          <button key={page} onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}
      </ul>
    </Paginate>
  );
}

export default Pagination;

const Paginate = styled.div`
  margin-left: 700px;
  button {
    position: relative;
    background-color: white;
    width: 30px;
    cursor: pointer;
  }
`;
