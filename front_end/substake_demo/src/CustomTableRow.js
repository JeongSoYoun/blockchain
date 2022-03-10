import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";

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
        <TableCell align="right">{row.rank}</TableCell>
        <TableCell align="right">{row.display_name}</TableCell>
        <TableCell align="right">{row.average_blocks}</TableCell>
        <TableCell align="right">{row.blocks_last_round[0]}</TableCell>
        <TableCell align="right">{row.minumum_bond}</TableCell>
        <TableCell align="right">{row.delegations}</TableCell>
        <TableCell align="right">{row.total_bonded}</TableCell>
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
