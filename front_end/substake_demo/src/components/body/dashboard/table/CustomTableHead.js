import React from "react";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { selectWindowSize } from "../../../../features/windowSizer/windowSlice";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)({
  fontSize: 10,
  fontWeight: "bold",
});
const DESCKTOP_HEAD_COLS = [
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
    id: "minimum_bond",
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

const MOBILE_HEAD_COLS = [
  {
    id: "display_name",
    label: "Display Name",
  },
  {
    id: "blocks_last_round",
    label: "Blocks Last Round",
  },
  {
    id: "total_bonded",
    label: "Total Bonded",
  },
];

const createHeadRows = (cols, sortHandler, orderBy, order) => {
  return (
    <TableHead
      sx={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <TableRow>
        {cols.map((col) => (
          <StyledTableCell
            key={col.id}
            align="center"
            sortDirection={orderBy === col.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : "asc"}
              onClick={sortHandler(col.id)}
            >
              {col.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function CustomTableHead(props) {
  const windowSizeSelector = useSelector(selectWindowSize);
  const {
    order, // "asc" or "dsc"
    orderBy, // "label "
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return windowSizeSelector.isMobile
    ? createHeadRows(MOBILE_HEAD_COLS, createSortHandler, orderBy, order)
    : createHeadRows(DESCKTOP_HEAD_COLS, createSortHandler, orderBy, order);
}

export default CustomTableHead;
