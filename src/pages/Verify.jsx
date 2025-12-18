import React, { useState } from "react";
import QRScanner from "../components/QRScanner";
import PlayerCard from "../components/PlayerCard";

const mockPlayers = [
  {
    name: "Ravi Kumar",
    village: "Rampur",
    team: "Rampur Lions",
    id: "KBPX1234",
    status: "Verified",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    aadhaarPhoto: "https://i.imgur.com/0y0y0y0.png"
  },
  {
    name: "Amit Singh",
    village: "Lakhanpur",
    team: "Lakhanpur Warriors",
    id: "KBPY5678",
    status: "Active",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    aadhaarPhoto: "https://i.imgur.com/1a1a1a1.png"
  },
];

function Verify() {
  const [found, setFound] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Simulate QR scan by accepting either Player ID or QR JSON string
  const handleVerify = (input) => {
    let player = null;
    try {
      // Try to parse as QR JSON
      const data = JSON.parse(input);
      if (data && data.id) {
        player = mockPlayers.find((p) => p.id.toLowerCase() === data.id.toLowerCase());
      }
    } catch {
      // Not JSON, treat as Player ID
      player = mockPlayers.find((p) => p.id.toLowerCase() === input.toLowerCase());
    }
    if (player) {
      setFound(player);
      setNotFound(false);
    } else {
      setFound(null);
      setNotFound(true);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, margin: "40px auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(44,83,100,0.07)",
          padding: "32px 24px",
        }}
      >
        <h2 style={{ color: "#2c5364", fontWeight: 700, marginBottom: 18 }}>
          QR / ID Verification
        </h2>
        <QRScanner onVerify={handleVerify} />
        {found && (
          <div style={{ marginTop: 32 }}>
            <PlayerCard player={found} />
          </div>
        )}
        {notFound && (
          <div
            style={{
              marginTop: 28,
              color: "#d32f2f",
              fontWeight: 600,
              textAlign: "center",
              fontSize: 17,
            }}
          >
            Player not found. Please check the ID.
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;
