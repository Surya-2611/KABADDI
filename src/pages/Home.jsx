import React from "react";


function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(44,83,100,0.08)',
      padding: '28px 18px',
      flex: '1 1 220px',
      minWidth: 200,
      margin: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.2s',
    }}>
      <div style={{ fontSize: 38, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 700, color: '#2c5364', fontSize: 19, marginBottom: 8 }}>{title}</div>
      <div style={{ color: '#444', fontSize: 15, textAlign: 'center', lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

function Home() {
  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 10px' }}>
      <div
        style={{
          background: 'linear-gradient(120deg, #b2fefa 0%, #0ed2f7 100%)',
          borderRadius: 22,
          padding: '48px 36px 36px 36px',
          boxShadow: '0 4px 32px rgba(44,83,100,0.10)',
          marginBottom: 36,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', right: 0, top: 0, width: 180, height: 180, background: 'radial-gradient(circle at 80% 20%, #0ed2f7 0%, #b2fefa 80%, transparent 100%)', opacity: 0.18, zIndex: 0 }} />
        <h1 style={{ color: '#0f2027', fontWeight: 800, fontSize: 38, marginBottom: 18, letterSpacing: 0.5, zIndex: 1, position: 'relative' }}>
          Village Kabaddi Player Digital ID & Proxy Prevention System
        </h1>
        <p style={{ color: '#1a2a3a', fontSize: 20, lineHeight: 1.7, fontWeight: 500, marginBottom: 18, zIndex: 1, position: 'relative' }}>
          Secure, digital identity for every kabaddi player. Prevent proxy players, ensure fair play, and manage tournaments with confidence. Modern, mobile-friendly, and built for rural sports excellence.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginTop: 32, zIndex: 1, position: 'relative', justifyContent: 'center' }}>
          <FeatureCard
            icon="🆔"
            title="Digital ID Cards"
            desc="Unique, tamper-proof digital ID for every player with QR code and photo."
          />
          <FeatureCard
            icon="📷"
            title="Instant QR Verification"
            desc="Scan QR or enter ID to instantly verify player authenticity at matches."
          />
          <FeatureCard
            icon="🛡️"
            title="Proxy Prevention"
            desc="Advanced checks to prevent proxy/duplicate players and ensure fair play."
          />
          <FeatureCard
            icon="📊"
            title="Admin Analytics"
            desc="Dashboard with real-time stats, flagged players, and verification logs."
          />
          <FeatureCard
            icon="📱"
            title="Mobile Friendly"
            desc="Fully responsive design for use on phones, tablets, and desktops."
          />
        </div>
      </div>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 2px 12px rgba(44,83,100,0.08)',
        padding: '32px 24px',
        marginBottom: 36,
      }}>
        <h2 style={{ color: '#2c5364', fontWeight: 700, fontSize: 26, marginBottom: 16 }}>
          How It Works
        </h2>
        <ol style={{ color: '#2c5364', fontSize: 17, margin: 0, paddingLeft: 22, lineHeight: 2 }}>
          <li>Register kabaddi players with their details and photo.</li>
          <li>Each player receives a digital ID card with a unique QR code.</li>
          <li>Organizers verify players at matches using QR scan or manual ID entry.</li>
          <li>System flags suspicious or duplicate entries for admin review.</li>
          <li>Admins monitor stats, verify, and manage players from the dashboard.</li>
        </ol>
      </div>
      <div style={{
        background: 'linear-gradient(90deg, #0f2027 0%, #2c5364 100%)',
        borderRadius: 16,
        color: '#fff',
        padding: '32px 24px',
        textAlign: 'center',
        marginBottom: 24,
        boxShadow: '0 2px 12px rgba(44,83,100,0.10)',
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 10 }}>
          Why Digital Kabaddi IDs?
        </h2>
        <p style={{ fontSize: 17, margin: 0, color: '#b2fefa', fontWeight: 500 }}>
          No more fake players, lost records, or unfair matches. Empower your village tournaments with technology and transparency.
        </p>
      </div>
      <div style={{ textAlign: 'center', margin: '32px 0 0 0', color: '#2c5364', fontWeight: 600, fontSize: 16 }}>
        <span style={{ background: '#b2fefa', padding: '8px 18px', borderRadius: 8, boxShadow: '0 1px 4px rgba(44,83,100,0.07)' }}>
          Built for rural sports. Trusted by organizers. Ready for your next kabaddi event!
        </span>
      </div>
    </div>
  );
}

export default Home;
