import React from "react";
import ContentBox from "./ContentBox";

const Menu = ({ onGoBack }) => {
  return (
    <div>
      <ContentBox width="20%" height="20%" top="5%" left="5%" content="Hello" />
      <ContentBox
        width="20%"
        height="20%"
        top="5%"
        right="5%"
        content="there"
      />

      <ContentBox
        width="20%"
        height="20%"
        top="35%"
        left="5%"
        content="Hello"
      />

      {/* Blue Box in the center */}
      <ContentBox
        width="20%"
        height="20%"
        top="35%"
        right="5%"
        content="Hello"
      />

      <ContentBox
        width="20%"
        height="20%"
        top="65%"
        left="5%"
        content="Hello"
      />

      {/* Blue Box in the center */}
      <ContentBox
        width="20%"
        height="20%"
        top="65%"
        right="5%"
        content="Hello"
      />

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={onGoBack}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
        {/* Add more menu items here in the future */}
      </div>
    </div>
  );
};

export default Menu;
