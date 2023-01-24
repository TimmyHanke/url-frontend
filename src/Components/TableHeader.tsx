import { THead as StyledTableHeader, TR } from "../StyledTable";
import { Column, SortColumn } from "./Table";

interface Props<T> {
  columns: Column<T>[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

function TableHeader<T>({ columns, sortColumn, onSort }: Props<T>) {
  // changes the ascending and descending depending on what it previously was.
  const raiseSort = (path: string) => {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  };

  return (
    <StyledTableHeader>
      <TR columns={columns.length}>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            style={{ cursor: column.path && "pointer" }}
            onClick={() => column.path && raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </TR>
    </StyledTableHeader>
  );
}

export default TableHeader;
