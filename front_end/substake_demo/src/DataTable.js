import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { dataRows } from "./getData";
import { getComparator } from "./utils";
import CustomTableHead from "./CustomTableHead";
import CustomTableRow from "./CustomTableRow";
import "./DataTable.css";

export default function DataTable() {
  const rows = dataRows;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rank");
  const handleSortRequest = (_, HeadCellId) => {
    const isAsc = orderBy === HeadCellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(HeadCellId);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
      }}
    >
      <Table>
        <CustomTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleSortRequest}
        />
        <TableBody>
          {rows.sort(getComparator(order, orderBy)).map((row) => (
            <CustomTableRow key={row.rank} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
