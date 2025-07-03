import React, { useState, useEffect } from 'react';
import './App.css';
import CricketIQModal from './CricketIQModal';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('dark');  // start with dark-theme for immersive experience
  const [modalOpen, setModalOpen] = useState(true); // modal visible by default

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Brand colour palette (can be moved to context/provider as needed)
  const palette = { accent: '#FFD600', primary: '#0D47A1', secondary: '#1565C0' };

  return (
    <div className="App">
      <header className="App-header" style={{ padding: '0' }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {/* Launch popup button if closed */}
        {!modalOpen && 
          <button 
            style={{
              fontSize: 21, fontWeight: 800, color: palette.accent,
              background: palette.primary, border: 'none', borderRadius: 14,
              margin: '18vh auto', padding: '15px 34px', cursor: 'pointer',
              boxShadow: `0 2px 16px ${palette.secondary}40`
            }}
            onClick={() => setModalOpen(true)}
          >
            Open CricketIQ Modal
          </button>
        }
        {/* MODAL POPUP */}
        {modalOpen && (
          <CricketIQModal
            accent={palette.accent}
            primary={palette.primary}
            secondary={palette.secondary}
            onClose={() => setModalOpen(false)}
          />
        )}
      </header>
    </div>
  );
}

export default App;
