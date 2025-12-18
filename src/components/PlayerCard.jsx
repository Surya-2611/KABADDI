import React from "react";
import "../styles/idCard.css";
import { QRCodeCanvas } from "qrcode.react";

function PlayerCard({ player }) {
  return (
    <div className="id-card-container" style={{ margin: '0 auto', maxWidth: 370 }}>
      <div className="id-card-gradient" style={{ boxShadow: '0 6px 32px rgba(44,83,100,0.13)' }}>
        <div className="id-card-header">
          <div className="id-card-photo" style={{ border: '3px solid #b2fefa', background: '#fff' }}>
            {player.photo ? (
              <img
                src={player.photo}
                alt="Player"
                style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', background: '#fff', border: '2px solid #0ed2f7' }}
              />
            ) : (
              <div className="photo-placeholder">
                <span role="img" aria-label="Player">
                  🧑
                </span>
              </div>
            )}
          </div>
          <div className="id-card-qr" style={{ border: '2px solid #b2fefa', background: '#fff' }}>
            <div className="qr-placeholder" style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              {player.qrData ? (
                <QRCodeCanvas value={player.qrData} size={48} level="H" includeMargin={false} />
              ) : (
                <span role="img" aria-label="QR">� QR</span>
              )}
            </div>
          </div>
        </div>
        <div className="id-card-body" style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, marginTop: 8, padding: '18px 18px 0 18px' }}>
          <div className="id-card-row">
            <span className="id-label">Name:</span>
            <span className="id-value">{player.name}</span>
          </div>
          <div className="id-card-row">
            <span className="id-label">Village:</span>
            <span className="id-value">{player.village}</span>
          </div>
          <div className="id-card-row">
            <span className="id-label">Team:</span>
            <span className="id-value">{player.team}</span>
          </div>
          {player.aadhaar && (
            <div className="id-card-row" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 8 }}>
              <span className="id-label">Aadhaar Number:</span>
              <span className="id-value" style={{ fontSize: 15, letterSpacing: 2, background: '#fff', color: '#2c5364', borderRadius: 6, padding: '2px 10px', marginTop: 4, fontWeight: 700 }}>
                {player.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3').replace(/\d(?=\d{4})/g, '*')}
              </span>
            </div>
          )}
          <div className="id-card-row">
            <span className="id-label">Player ID:</span>
            <span className="id-value">{player.id}</span>
          </div>
          <div className="id-card-row">
            <span className="id-label">Status:</span>
            <span
              className={
                player.status === "Verified"
                  ? "id-status verified"
                  : "id-status active"
              }
              style={{ fontSize: 15 }}
            >
              {player.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
