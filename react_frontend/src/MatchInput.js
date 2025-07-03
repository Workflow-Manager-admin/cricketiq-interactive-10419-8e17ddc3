import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * Step 1 - Input modal for match details.
 */
export default function MatchInput({ onSubmit, loading, setLoading, accent, primary, secondary }) {
  const [form, setForm] = useState({ teams: '', location: '', format: 'T20', overs: 20 });
  const [err, setErr] = useState(null);

  // PUBLIC_INTERFACE
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleSubmit = e => {
    e.preventDefault();
    setErr(null);
    if (!form.teams || !form.location || !form.format) {
      setErr('Please fill all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(form);
    }, 700); // Simulate async
  };

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '0 18px 10px', display: 'flex', flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', marginBottom: 10 }}>
        <input
          name="teams"
          value={form.teams}
          onChange={handleChange}
          style={inputStyle(accent)}
          placeholder="Teams (e.g., India vs Australia)"
          autoFocus
          autoComplete="off"
        />
      </div>
      <div style={{ width: '100%', marginBottom: 10 }}>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          style={inputStyle(accent)}
          placeholder="Venue (e.g., Wankhede Stadium)"
          autoComplete="off"
        />
      </div>
      <div style={{ width: '100%', display: 'flex', gap: 12, marginBottom: 14 }}>
        <select
          name="format"
          value={form.format}
          onChange={handleChange}
          style={selectStyle(accent)}
        >
          <option value="T20">T20</option>
          <option value="ODI">ODI</option>
          <option value="Test">Test</option>
        </select>
        <input
          type="number"
          min={form.format === 'Test' ? 90 : 1}
          max={form.format === 'T20' ? 20 : form.format === 'ODI' ? 50 : 180}
          name="overs"
          style={inputStyle(accent)}
          value={form.overs}
          onChange={handleChange}
          placeholder="Overs"
        />
      </div>
      {err && <div style={{ color: accent, marginBottom: 6, fontWeight: 600 }}>{err}</div>}

      <button type="submit" disabled={loading}
        style={buttonStyle(accent, loading)}
      >
        {loading ? 'Loading...' : 'Proceed'}
      </button>
    </form>
  );
}

const inputStyle = (accent) => ({
  width: '100%',
  padding: '10px 12px',
  fontSize: 15,
  background: '#121927',
  color: '#fff',
  border: `1.8px solid ${accent}`,
  borderRadius: 7,
  outline: 'none',
  marginBottom: 0,
  transition: 'box-shadow 0.2s',
  boxShadow: `0 1.5px 6px #0002`
});

const selectStyle = (accent) => ({
  ...inputStyle(accent),
  background: '#191F27',
  color: '#fff',
  fontWeight: 600,
  width: '46%'
});

const buttonStyle = (accent, loading) => ({
  marginTop: 10,
  padding: '12px 0',
  width: '100%',
  background: accent,
  color: '#181d36',
  border: 'none',
  borderRadius: 7,
  fontSize: 17,
  fontWeight: 800,
  letterSpacing: '0.03em',
  cursor: loading ? 'not-allowed' : 'pointer',
  opacity: loading ? 0.7 : 1.0,
  boxShadow: `0 2px 14px ${accent}40`
});
