import React from "react";
import { useTable } from "react-table";

export default function Table({ columns, data }) {
  // useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                const headerValue = cell.column.Header;

                let cellStyle = {};
                if (headerValue === "Color") {
                  const colorValue = cell.value ? cell.value : "white";
                  console.log(colorValue);
                  cellStyle = {
                    backgroundColor: colorValue,
                    borderRadius: "25px",
                  };
                  return <td {...cell.getCellProps()} style={cellStyle}>{cell.render("Cell")}</td>;
                }
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
