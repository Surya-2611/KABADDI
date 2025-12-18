import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";

function Register() {
  function generatePlayerId(name, village, team) {
    const base = (name + village + team + Date.now()).replace(/\s+/g, "");
    return (
      "KBP" +
      Math.random().toString(36).substring(2, 5).toUpperCase() +
      base
        .split("")
        .reduce((acc, c) => acc + c.charCodeAt(0), 0)
        .toString()
        .slice(-4)
    );
  }

  // Simulated player database for uniqueness check
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ name: "", village: "", team: "", aadhaar: "" });
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [aadhaarPhotoURL, setAadhaarPhotoURL] = useState("");
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAadhaarPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadhaarPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setAadhaarPhotoURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Uniqueness check for Aadhaar number and Aadhaar photo (by base64 string)
    const aadhaarExists = players.some(
      (p) => p.aadhaar === form.aadhaar || (p.aadhaarPhoto && p.aadhaarPhoto === aadhaarPhotoURL)
    );
    if (aadhaarExists) {
      setError("Aadhaar number or Aadhaar card photo already exists for another player.");
      return;
    }
    const id = generatePlayerId(form.name, form.village, form.team);
    const qrData = JSON.stringify({
      id,
      name: form.name,
      village: form.village,
      team: form.team,
    });
    const newPlayer = {
      ...form,
      id,
      status: "Active",
      photo: photoURL,
      aadhaarPhoto: aadhaarPhotoURL,
      qrData,
    };
    setPlayer(newPlayer);
    setPlayers([...players, newPlayer]);
  };

  return (
    <div className="container" style={{ maxWidth: 520, margin: "40px auto" }}>
      <div
        style={{
          background: "linear-gradient(120deg, #b2fefa 0%, #0ed2f7 100%)",
          borderRadius: 20,
          boxShadow: "0 4px 24px rgba(44,83,100,0.10)",
          padding: "40px 28px 32px 28px",
        }}
      >
        <h2 style={{ color: "#0f2027", fontWeight: 800, fontSize: 28, marginBottom: 18, letterSpacing: 0.5 }}>
          Player Registration
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: "#2c5364", fontSize: 16 }}>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginTop: 7,
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
              />
            </label>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: "#2c5364", fontSize: 16 }}>
              Village
              <input
                type="text"
                name="village"
                value={form.village}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginTop: 7,
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
              />
            </label>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: "#2c5364", fontSize: 16 }}>
              Team
              <input
                type="text"
                name="team"
                value={form.team}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginTop: 7,
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
              />
            </label>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: "#2c5364", fontSize: 16 }}>
              Aadhaar Number
              <input
                type="text"
                name="aadhaar"
                value={form.aadhaar}
                onChange={handleChange}
                pattern="\d{12}"
                maxLength={12}
                minLength={12}
                required
                style={{
                  width: "100%",
                  marginTop: 7,
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1.5px solid #b0b0b0",
                  fontSize: 17,
                  background: "#f7f9fa",
                  fontWeight: 500,
                  letterSpacing: 2,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                placeholder="Enter 12-digit Aadhaar"
              />
            </label>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontWeight: 500, color: "#222" }}>
              Aadhaar Card Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAadhaarPhoto}
                required
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "8px 0",
                  fontSize: 15,
                }}
              />
            </label>
            {aadhaarPhotoURL && (
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <img
                  src={aadhaarPhotoURL}
                  alt="Aadhaar Preview"
                  style={{ width: 120, height: 80, borderRadius: 8, objectFit: 'cover', border: '2px solid #b2fefa' }}
                />
              </div>
            )}
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontWeight: 500, color: "#222" }}>
              Player Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                required
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "8px 0",
                  fontSize: 15,
                }}
              />
            </label>
            {photoURL && (
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <img
                  src={photoURL}
                  alt="Player Preview"
                  style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', border: '2px solid #b2fefa' }}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #0f2027, #2c5364)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 0",
              fontSize: 17,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Generate Digital ID
          </button>
        </form>
        {error && (
          <div style={{ color: '#d32f2f', background: '#fff3f3', border: '1.5px solid #d32f2f', borderRadius: 8, padding: '10px 16px', marginBottom: 18, fontWeight: 600, fontSize: 15, textAlign: 'center' }}>
            {error}
          </div>
        )}
        {player && !error && (
          <div style={{ marginTop: 36 }}>
            <PlayerCard player={player} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
