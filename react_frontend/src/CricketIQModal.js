import React, { useState } from 'react';
import MatchInput from './MatchInput';
import ScenarioPanel from './ScenarioPanel';
import PredictionPanel from './PredictionPanel';
import AnalysisPanel from './AnalysisPanel';
import ChartPanel from './ChartPanel';

// Modal overlay styling with dark immersive background & brand accent
const modalStyles = (accent = '#FFD600', primary = '#0D47A1', secondary = '#1565C0') => ({
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 9999,
    background: 'rgba(10,18,38,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    background: 'var(--bg-secondary, #22293a)',
    borderRadius: 20,
    boxShadow: `0 8px 32px 0 ${accent}40, 0 1.5px 16px ${secondary}10`,
    width: '98vw',
    maxWidth: 550,
    minWidth: 318,
    color: 'var(--text-primary, #fff)',
    border: `3px solid ${accent}`,
    padding: '0 0 16px 0',
    animation: 'fadein 0.45s',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 10,
    fontSize: 22,
    background: 'none',
    border: 'none',
    color: accent,
    cursor: 'pointer',
    opacity: 0.8,
    transition: 'opacity 0.14s'
  }
});

// PUBLIC_INTERFACE
/**
 * Main popup modal for CricketIQ analysis workflow.
 */
export default function CricketIQModal({ accent, primary, secondary, onClose }) {
  // Step flow: 0=match input, 1=scenario-gen, 2=prediction, 3=analysis, 4=charts
  const [step, setStep] = useState(0);

  // persist session state
  const [matchDetails, setMatchDetails] = useState(null);
  const [scenarioObj, setScenarioObj] = useState(null);
  const [userPrediction, setUserPrediction] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // For sample charts: batsman and bowler stats
  const [batsmanStats, setBatsmanStats] = useState(null);
  const [bowlerStats, setBowlerStats] = useState(null);

  // Reset everything on modal close
  const handleClose = () => {
    setStep(0);
    setMatchDetails(null);
    setScenarioObj(null);
    setUserPrediction(null);
    setAnalysisResult(null);
    setBatsmanStats(null);
    setBowlerStats(null);
    if (onClose) onClose();
  };

  // Pass context colour
  const palette = { accent, primary, secondary };

  return (
    <div style={modalStyles(accent, primary, secondary).overlay}>
      <div style={modalStyles(accent, primary, secondary).container}>
        <button aria-label="Close modal" style={modalStyles(accent, primary, secondary).closeBtn} onClick={handleClose}>
          &times;
        </button>
        <div style={{ marginTop: 24, marginBottom: 8 }}>
          <h2 style={{
            color: '#ffd600',
            margin: 0,
            fontWeight: 800,
            fontSize: '27px',
            textShadow: `0 2px 8px ${primary}88`,
            textAlign: 'center'
          }}>
            Fan Engagement
          </h2>
          {step < 4 &&
            <div style={{ color: secondary, fontWeight: 500, fontSize: 15, marginBottom: 6 }}>
              <span style={{ opacity: 0.63 }}>Step {step + 1} of 4</span>
            </div>
          }
        </div>
        {step === 0 &&
          <MatchInput
            onSubmit={(md) => { setMatchDetails(md); setStep(1); }}
            loading={loading}
            setLoading={setLoading}
            accent={accent}
            primary={primary}
            secondary={secondary}
          />
        }
        {step === 1 &&
          <ScenarioPanel
            matchDetails={matchDetails}
            scenarioObj={scenarioObj}
            setScenarioObj={setScenarioObj}
            loading={loading}
            setLoading={setLoading}
            onContinue={() => setStep(2)}
            accent={accent}
            primary={primary}
            secondary={secondary}
          />
        }
        {step === 2 &&
          <PredictionPanel
            scenarioObj={scenarioObj}
            userPrediction={userPrediction}
            setUserPrediction={setUserPrediction}
            onSubmit={() => setStep(3)}
            accent={accent}
            primary={primary}
            secondary={secondary}
          />
        }
        {step === 3 &&
          <AnalysisPanel
            scenarioObj={scenarioObj}
            userPrediction={userPrediction}
            analysisResult={analysisResult}
            setAnalysisResult={setAnalysisResult}
            onContinue={(batsmanData, bowlerData) => {
              setBatsmanStats(batsmanData);
              setBowlerStats(bowlerData);
              setStep(4);
            }}
            loading={loading}
            setLoading={setLoading}
            accent={accent}
            primary={primary}
            secondary={secondary}
          />
        }
        {step === 4 &&
          <ChartPanel
            batsmanStats={batsmanStats}
            bowlerStats={bowlerStats}
            accent={accent}
            primary={primary}
            secondary={secondary}
          />
        }
      </div>
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: scale(0.98);} to {opacity:1; transform:scale(1);} }
      `}</style>
    </div>
  );
}
