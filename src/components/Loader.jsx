import React from "react";

function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div
        style={{
          display: "inline-block",
          width: 48,
          height: 48,
          border: "5px solid #2c5364",
          borderTop: "5px solid #b2fefa",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
