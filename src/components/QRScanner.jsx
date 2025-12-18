import React, { useState } from "react";

function QRScanner({ onVerify }) {
  const [manualId, setManualId] = useState("");

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      onVerify(manualId.trim());
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <div
        style={{
          background: "linear-gradient(120deg, #b2fefa 0%, #0ed2f7 100%)",
          borderRadius: 18,
          padding: 32,
          marginBottom: 36,
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(44,83,100,0.10)",
        }}
      >
        <div
          style={{
            width: 240,
            height: 180,
            background: "#fff",
            borderRadius: 18,
            margin: "0 auto 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            color: "#2c5364",
            fontWeight: 700,
            letterSpacing: 1,
            boxShadow: "0 2px 8px rgba(44,83,100,0.07)",
          }}
        >
          <span style={{ opacity: 0.7 }}>📷</span>
        </div>
        <div style={{ color: "#1976d2", fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
          Camera Preview (Demo)
        </div>
        <div style={{ color: "#555", fontSize: 15 }}>
          (QR code scanning will appear here in production)
        </div>
      </div>
      <form onSubmit={handleManualVerify} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(44,83,100,0.07)', padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Enter Player ID or Scan QR"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1.5px solid #b0b0b0",
              fontSize: 17,
              background: "#f7f9fa",
              fontWeight: 500,
              letterSpacing: 1,
              outline: 'none',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #0f2027, #2c5364)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.2s",
            boxShadow: "0 1px 4px rgba(44,83,100,0.07)",
          }}
        >
          Verify Player
        </button>
      </form>
    </div>
  );
}

export default QRScanner;
