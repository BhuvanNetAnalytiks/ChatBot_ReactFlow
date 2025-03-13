import React, { useState, useEffect } from "react";

const NodeOptions = ({ id, onOptions }) => {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      const isButton = e.target.tagName === "BUTTON";
      const isOptionMenu = e.target.closest("[data-options-menu]");

      // Close options when clicking outside
      if (!isButton && !isOptionMenu) {
        setShowOptions(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleOptionClick = (action) => {
    if (typeof onOptions === 'function') {
      onOptions(id, action);
    } else {
      console.error('onOptions is not a function');
    }
    setShowOptions(false);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        style={{
          position: "absolute",
          right: "-1px",
          top: "-5px",
          background: "none",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          padding: "5px",
        }}
      >
        ⋮
      </button>
      {showOptions && (
        <div
          data-options-menu
          style={{
            position: "absolute",
            top: "-160px",
            right: "-15px",
            background: "white",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            width: "150px",
            zIndex: 1000,
          }}
        >
          <div
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              // onOptions(id, "delete");  // Delete the node
              // setShowOptions(false);
              handleOptionClick('delete');
            }}
          >
            Delete Node
          </div>
          <div
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              onOptions(id, "copy");  // Copy the node
              setShowOptions(false);
            }}
          >
            Copy Node
          </div>
          <div
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              onOptions(id, "change");  // Change block action
              setShowOptions(false);
            }}
          >
            Change Block
          </div>
          <div
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              onOptions(id, "about");  // Show info about the node
              setShowOptions(false);
            }}
          >
            About Node
          </div>
        </div>
      )}
    </>
  );
};

export default NodeOptions;
