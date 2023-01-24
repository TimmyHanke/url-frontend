import _ from "lodash";
import { TBody, TR } from "../StyledTable";
import { Column, Data } from "../Components/Table";

interface Props<T extends Data> {
  data: T[];
  columns: Column<T>[];
}

function TableBody<T extends Data>({ data, columns }: Props<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (column.content) return column.content(item);
    if (column.path) return _.get(item, column.path);
    return null;
  };

  const createKey = (item: T, column: Column<T>) => {
    return item._id + (column.path || column.key);
  };

  return (
    <TBody>
      {data.map((item) => (
        <TR key={item._id} columns={columns.length}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </TR>
      ))}
    </TBody>
  );
}

export default TableBody;
