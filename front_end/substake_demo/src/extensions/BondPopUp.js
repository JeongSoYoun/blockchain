import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSelector/userSlice";
import Modal, {
  useModalState,
  modalAnimation,
} from "react-simple-modal-provider";
import { cutAddress } from "./utils";
import { TransactionManager } from "./TransactionManager";
import "./PopUpView.css";

function BondPopUp({ children }) {
  const [isOpen, setIsOpen] = useModalState();
  const [stakeValue, setStakeValue] = useState(0);
  const userSelector = useSelector(selectUser);
  const BALANCE_MAX = userSelector ? userSelector.userBalance : 0;
  const CANDIDATE_ADDRESS = userSelector ? userSelector.candidateAddress : null;
  const USER_ADDRESS = userSelector ? userSelector.userAddress : null;

  const requestInfo = () => {
    console.log("You've Requested!");
    TransactionManager.StakingDelegateTX(
      CANDIDATE_ADDRESS,
      USER_ADDRESS,
      stakeValue
    );
  };
  const handleChange = (e) => {
    if (Number(e.target.value) > Number(BALANCE_MAX)) {
      return setStakeValue(BALANCE_MAX);
    }
    setStakeValue(e.target.value);
  };
  return (
    <Modal
      id={"BondPopUp"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setIsOpen}
      duration={250}
      animation={modalAnimation.slideUp}
      allowClickOutside={true}
      draggable={false}
    >
      <div className="modal-body">
        <h2 className="modal-body-title">Asset Bonding</h2>
        <div className="modal-body-address">
          <p id="user"> {USER_ADDRESS ? cutAddress(USER_ADDRESS) : null}</p>
          <p> to </p>
          <p id="candidate">
            {CANDIDATE_ADDRESS ? cutAddress(CANDIDATE_ADDRESS) : null}
          </p>
        </div>
        <div className="modal-body-bond">
          <div className="modal-body-input">
            <input
              value={stakeValue}
              onChange={(e) => handleChange(e)}
              type="number"
            />
            <div className="modal-body-input-text">
              <p onClick={() => setStakeValue(BALANCE_MAX)}>MAX</p>
            </div>
          </div>
        </div>

        <div className="modal-body-buttons">
          <button onClick={() => requestInfo()}>Stake</button>
          <button id="close" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BondPopUp;
