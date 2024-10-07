import React from "react";

const ContentBox = ({ width, height, top, left, right, bottom, content }) => {
  const style = {
    width: width || "100px",
    height: height || "100px",
    position: "absolute",
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 255, 0.1)", // Light blue background
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "20px",
    boxSizing: "border-box",
  };

  return <div style={style}>{content}</div>;
};

export default ContentBox;
