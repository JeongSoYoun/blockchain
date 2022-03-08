import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";

CustomTableRow.propTypes = {
  row: PropTypes.shape({
    rank: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    abr: PropTypes.number.isRequired,
    blr: PropTypes.number.isRequired,
    minBond: PropTypes.number.isRequired,
    delegations: PropTypes.string.isRequired,
    totalBonded: PropTypes.string.isRequired,
  }).isRequired,
};

function CustomTableRow(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      {/* Section 1 */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.rank}
        </TableCell>
        <TableCell align="right">{row.displayName}</TableCell>
        <TableCell align="right">{row.abr}</TableCell>
        <TableCell align="right">{row.blr}</TableCell>
        <TableCell align="right">{row.minBond}</TableCell>
        <TableCell align="right">{row.delegations}</TableCell>
        <TableCell align="right">{row.totalBonded}</TableCell>
      </TableRow>

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
              <p>
                Please Note: It takes 2 rounds (~ 12 hrs) for rewards, takes 28
                rounds (~ 7 days) to proceed delegation-related actions.
              </p>
              <div className="table-collapsible-controller">
                <div className="table-collapsible-input">
                  <input placeholder="Amount" />
                  <div className="table-collabsible-input-text">
                    <p>MAX</p>
                  </div>
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
