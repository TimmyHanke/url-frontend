import { THead as StyledTableHeader, TR } from "../StyledTable";
import { Column, SortColumn } from "./Table";

interface Props<T> {
  columns: Column<T>[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

function TableHeader<T>({ columns, sortColumn, onSort }: Props<T>) {
  const raiseSort = (path: string) => {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  };

  const renderSortIcon = (column: Column<T>) => {
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-caret-up" />;
    return <i className="fas fa-caret-down" />;
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
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </TR>
    </StyledTableHeader>
  );
}

export default TableHeader;
