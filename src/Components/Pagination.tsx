import React from "react";
import _ from "lodash";
import styled from "styled-components";

interface IPaginate {
  itemCount: number;
  pageSize: number;
  selectedPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  itemCount,
  pageSize,
  selectedPage,
  onPageChange,
}: IPaginate) {
  // Creates whole number to the nearest whole number.
  const pageCount = Math.ceil(itemCount / pageSize);

  // urlList < 11 dont show the pagination buttons
  if (itemCount < 11) return null;
  // creates the correct amount of buttons
  const pages = _.range(1, pageCount + 1);
  return (
    //creates the buttons with map with the added onclick that is sent to collect the page currently clicked
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
