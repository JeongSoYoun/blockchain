import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import CustomTableHead from "./CustomTableHead";
import CustomTableRow from "./CustomTableRow";
import { TailSpin } from "react-loader-spinner";
import { stateMapping } from "../../../../extensions/utils";
import { getComparator } from "../../../../extensions/utils";
import { DataManager } from "../../../../extensions/DataManager";
import "./BlockDataTable.css";

function BlockDataTable({ chainName, roundCount, isActive, setCurrentRound }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rank");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    DataManager.requestChainData(
      setRows,
      setIsLoading,
      setCurrentRound,
      isMounted,
      chainName,
      roundCount,
      stateMapping[isActive]
    );
    return () => {
      isMounted = false;
    };
  }, [chainName, roundCount, isActive, setCurrentRound]);

  const handleSortRequest = (_, HeadCellId) => {
    const isAsc = orderBy === HeadCellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(HeadCellId);
  };

  return isLoading ? (
    <TailSpin color="#00BFFF" height={80} width={40} />
  ) : (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        width: "auto",
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

export default BlockDataTable;
