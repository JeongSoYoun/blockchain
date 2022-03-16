import Modal, {
  useModalState,
  modalAnimation,
} from "react-simple-modal-provider";
import React from "react";
import "./PopUpView.css";

function UnbondPopUp({ children }) {
  const [isOpen, setIsOpen] = useModalState();

  return (
    <Modal
      id={"UnbondPopUp"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setIsOpen}
      duration={250}
      animation={modalAnimation.slideUp}
      allowClickOutside={true}
      draggable={false}
    >
      <div className="modal-body">
        <h2 className="modal-body-title">Asset Unbonding</h2>
        <div className="modal-body-minimum-bond">
          <p>Minimum Bond: </p>
        </div>

        <div className="modal-body-buttons">
          <button>Stake</button>
          <button id="close" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UnbondPopUp;
