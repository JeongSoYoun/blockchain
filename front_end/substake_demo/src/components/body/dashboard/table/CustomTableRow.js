import React, { useState } from "react";
import {
  setUserStatus,
  selectUser,
} from "../../../../features/userSelector/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { selectWindowSize } from "../../../../features/windowSizer/windowSlice";
import StakeController from "./StakeController";

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

const createRow = (onClickTable, row, cols) => {
  return (
    <StyledRow onClick={() => onClickTable(row.address)}>
      {cols.map((col) => (
        <StyledTableCell key={col} align="center">
          {col === "blocks_last_round" ? row[col][0] : row[col]}
        </StyledTableCell>
      ))}
    </StyledRow>
  );
};

function CustomTableRow(props) {
  const { row } = props;
  const dispatch = useDispatch();
  const windowSizeSelector = useSelector(selectWindowSize);
  const userSelector = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const onClickTable = (candidate_address) => {
    setOpen((curr) => !curr);
    const USER_ADDRESS = userSelector.userAddress;
    const USER_BALANCE = userSelector.userBalance;
    const CHAIN_NAME = userSelector.chainName;
    const CANDIDATE_ADDRESS = candidate_address;
    dispatch(
      setUserStatus({
        userAddress: USER_ADDRESS,
        userBalance: USER_BALANCE,
        candidateAddress: CANDIDATE_ADDRESS,
        chainName: CHAIN_NAME,
      })
    );
  };
  return (
    <React.Fragment>
      {/* Section 1 */}
      {windowSizeSelector.isMobile
        ? createRow(onClickTable, row, MOBILE_COLS)
        : createRow(onClickTable, row, DESKTOP_COLS)}

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
              <h2 style={{ fontSize: 12 }}>Somethings should be put here...</h2>
              <div className="table-collapsible-controller">
                <div className="table-collapsible-stake-controller">
                  <div id="bond" className="table-collapsible-stake">
                    <StakeController controller="+" />
                    <StakeController controller="-" />
                  </div>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <div className="table-collapsible-unclaim">
                    <CloseIcon sx={{ fontSize: 12 }} />
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CustomTableRow;
