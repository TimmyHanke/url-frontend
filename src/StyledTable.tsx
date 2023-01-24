import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  margin-top: 24px;
  border-spacing: 0;
  position: relative;
`;

export const THead = styled.thead`
  text-align: left;

  & th {
    padding: 8px;
    border: 1px solid lightgrey;
  }
`;

export const TBody = styled.tbody`
  text-align: left;
  & td {
    padding: 8px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    border: 1px solid lightgrey;
  }
`;

export const TR = styled.tr<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  padding: 0 32px;
`;
