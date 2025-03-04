import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

export default function VelaModal({
  dismiss,
  showDismiss,
  title,
  body,
  action,
  onAction,
  large,
  align = "center",
}) {
  const handleSurroundingClick = (event) => {
    event.stopPropagation();


    if (event.target === event.currentTarget) {
      dismiss();
    }
  };
  return createPortal(
    <div
      onClick={handleSurroundingClick}
      className="vela-modal fixed top-0 right-0 h-screen w-screen flex  justify-center items-center bg-vela-darkest-blue bg-opacity-80 z-50"
    >
      <div
        className={`card !bg-vela-modal-background text-vela-modal-text-color shadow-lg !min-w-min ${
          large ? "!w-auto " : "!max-w-3xl"
        }`}
        style={{
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div className="flex justify-end w-full align-middle">
          {(showDismiss || large) && (
            <div>
              <button onClick={dismiss} className="iconButton">
                <AiOutlineClose />
              </button>
            </div>
          )}
        </div>
        {title && (
          <h4
            className="text-base font-medium py-2 -mb-2"
            style={{ textAlign: align }}
          >
            {title}
          </h4>
        )}
        <div className="p-1">{body && <p>{body}</p>}</div>

        <div className="flex justify-end space-x-2 mb-4 mr-4">
          {action && (
            <div className="p-1">
              <button
                onClick={onAction}
                className="border border-vela-orange text-vela-darkest-blue text-base bg-vela-orange hover:bg-vela-orange hover:opacity-90 hover:border-vela-orange hover:text-vela-darkest-blue rounded-full px-3 py-1 transition-colors duration-200"
              >
                {action}
              </button>
            </div>
          )}
          <div className="p-1">
            <button
              onClick={handleSurroundingClick}
              className="border border-vela-modal-text-color text-vela-modal-text-color text-base hover:bg-vela-orange hover:border-vela-orange hover:text-vela-darkest-blue rounded-full px-3 py-1 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
