import React from "react";
import { useModal } from "react-simple-modal-provider";
import "./StakeController.css";

function StakeController({ controller }) {
  const { open: BondPopUp } = useModal("BondPopUp");
  const { open: UnbondPopUp } = useModal("UnbondPopUp");

  return controller === "+" ? (
    <p id="bond" onClick={BondPopUp}>
      {controller}
    </p>
  ) : (
    <p id="unbond" onClick={UnbondPopUp}>
      {controller}
    </p>
  );
}

export default StakeController;
