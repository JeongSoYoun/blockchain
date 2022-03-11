import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import { useSelector } from "react-redux";
import { selectWindowSize } from "./features/windowSizer/windowSlice";
import { styled } from "@mui/material/styles";

const StyledRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: "#dbdbd7",
    opacity: 0.3,
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});
const StyledTableCell = styled(TableCell)({
  fontSize: 10,
});
const DESKTOP_COLS = [
  "rank",
  "display_name",
  "average_blocks",
  "blocks_last_round",
  "minimum_bond",
  "delegations",
  "total_bonded",
];
const MOBILE_COLS = ["display_name", "blocks_last_round", "total_bonded"];
// {
//   open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;
// }
const createRow = (open, setOpen, row, cols) => {
  return (
    <StyledRow onClick={() => setOpen(!open)}>
      {cols.map((col) => (
        <StyledTableCell key={col} align="center">
          {col === "blocks_last_round" ? row[col][0] : row[col]}
        </StyledTableCell>
      ))}
    </StyledRow>
  );
};

function CustomTableRow(props) {
  const windowSizeSelector = useSelector(selectWindowSize);
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      {/* Section 1 */}
      {windowSizeSelector.isMobile
        ? createRow(open, setOpen, row, MOBILE_COLS)
        : createRow(open, setOpen, row, DESKTOP_COLS)}

      {/* Section 2 */}
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={10}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ backgroundColor: "#F2F2F2" }}
          >
            <div className="table-collapsible-info">
              {windowSizeSelector.isMobile ? null : (
                <p>
                  Please Note: It takes 2 rounds (~ 12 hrs) for rewards, takes
                  28 rounds (~ 7 days) to proceed delegation-related actions.
                </p>
              )}
              <div className="table-collapsible-controller">
                <div className="table-collapsible-input">
                  <input type="number" />
                  <div className="table-collabsible-input-text">
                    <p>MAX</p>
                  </div>
                </div>
                <div className="table-collapsible-stake">
                  <p>STAKE</p>
                </div>
                <div className="table-collapsible-unclaim">
                  <p>UNCLAIM</p>
                </div>
              </div>
              <p className="table-collapsible-info-pct">2000(0.1%)</p>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CustomTableRow;
