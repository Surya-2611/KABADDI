import React, { useState } from "react";
import Loader from "../components/Loader";

const initialPlayers = [
  { id: "KBPX1234", name: "Ravi Kumar", status: "Verified" },
  { id: "KBPY5678", name: "Amit Singh", status: "Active" },
  { id: "KBPZ4321", name: "Suresh Yadav", status: "Flagged" },
  { id: "KBPW8765", name: "Manoj Patel", status: "Verified" },
];

function Dashboard() {
  const [players] = useState(initialPlayers);
  const [loading] = useState(false);

  const total = players.length;
  const verified = players.filter((p) => p.status === "Verified").length;
  const flagged = players.filter((p) => p.status === "Flagged").length;

  return (
    <div className="container" style={{ maxWidth: 700, margin: "40px auto" }}>
      <div
        style={{
          background: "linear-gradient(120deg, #b2fefa 0%, #0ed2f7 100%)",
          borderRadius: 20,
          boxShadow: "0 4px 24px rgba(44,83,100,0.10)",
          padding: "40px 28px 32px 28px",
        }}
      >
        <h2 style={{ color: "#0f2027", fontWeight: 800, fontSize: 30, marginBottom: 18, letterSpacing: 0.5 }}>
          Admin Dashboard
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 28,
                marginBottom: 36,
                justifyContent: 'center',
              }}
            >
              <div className="dashboard-card">
                <div className="dashboard-value">{total}</div>
                <div className="dashboard-label">Total Players</div>
              </div>
              <div className="dashboard-card">
                <div className="dashboard-value">{verified}</div>
                <div className="dashboard-label">Verified Players</div>
              </div>
              <div className="dashboard-card">
                <div className="dashboard-value">{flagged}</div>
                <div className="dashboard-label">Flagged Players</div>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: '0 2px 8px rgba(44,83,100,0.07)',
                }}
              >
                <thead>
                  <tr style={{ background: "#b2fefa" }}>
                    <th style={thStyle}>Player ID</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p) => (
                    <tr key={p.id}>
                      <td style={tdStyle}>{p.id}</td>
                      <td style={tdStyle}>{p.name}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            color:
                              p.status === "Verified"
                                ? "#388e3c"
                                : p.status === "Flagged"
                                ? "#d32f2f"
                                : "#1976d2",
                            fontWeight: 700,
                            fontSize: 15,
                            letterSpacing: 0.5,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <style>
        {`
          .dashboard-card {
            flex: 1 1 180px;
            background: linear-gradient(120deg, #b2fefa 0%, #0ed2f7 100%);
            border-radius: 12px;
            padding: 24px 0 18px 0;
            text-align: center;
            min-width: 160px;
            box-shadow: 0 2px 8px rgba(44,83,100,0.07);
          }
          .dashboard-value {
            font-size: 32px;
            font-weight: 700;
            color: #0f2027;
            margin-bottom: 6px;
          }
          .dashboard-label {
            font-size: 16px;
            color: #2c5364;
            font-weight: 500;
          }
          @media (max-width: 600px) {
            .dashboard-card {
              min-width: 120px;
              padding: 16px 0 12px 0;
            }
            .dashboard-value {
              font-size: 22px;
            }
            .dashboard-label {
              font-size: 13px;
            }
          }
        `}
      </style>
    </div>
  );
}

const thStyle = {
  padding: "12px 8px",
  color: "#2c5364",
  fontWeight: 700,
  fontSize: 16,
  borderBottom: "2px solid #b2fefa",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px 8px",
  color: "#222",
  fontSize: 15,
  borderBottom: "1px solid #e0e7ef",
};

export default Dashboard;
