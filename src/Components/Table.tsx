import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { Table as StyledTable } from "../StyledTable";

export interface Data {
  _id: string;
}

export interface Column<T> {
  label?: string;
  path?: string;
  key?: string;
  content?: (data: T) => React.ReactElement;
}

export interface SortColumn {
  order: "asc" | "desc";
  path: string;
}

interface Props<T extends Data> {
  data: T[];
  columns: Column<T>[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

function Table<T extends Data>({
  data,
  columns,
  sortColumn,
  onSort,
}: Props<T>) {
  return (
    <StyledTable className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </StyledTable>
  );
}

export default Table;
