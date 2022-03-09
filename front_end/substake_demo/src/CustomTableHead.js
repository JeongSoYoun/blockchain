import React from "react";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const HEAD_ROWS = [
  {
    id: "rank",
    label: "Rank",
  },
  {
    id: "display_name",
    label: "Display Name",
  },
  {
    id: "average_blocks",
    label: "Average Blocks Per Round",
  },
  {
    id: "blocks_last_round",
    label: "Blocks Last Round",
  },
  {
    id: "minumum_bond",
    label: "Minimum Bond",
  },
  {
    id: "delegations",
    label: "Delegations",
  },
  {
    id: "total_bonded",
    label: "Total Bonded",
  },
];

function CustomTableHead(props) {
  const {
    order, // "asc" or "dsc"
    orderBy, // "label "
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <TableRow>
        <TableCell />
        {HEAD_ROWS.map((row) => (
          <TableCell
            key={row.id}
            align="right"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={orderBy === row.id ? order : "asc"}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
