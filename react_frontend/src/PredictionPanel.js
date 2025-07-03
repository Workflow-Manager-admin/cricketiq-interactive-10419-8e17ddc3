import React from 'react';

// PUBLIC_INTERFACE
/**
 * Step 3: render question yes/no answer and track user choice.
 */
export default function PredictionPanel({
  scenarioObj, userPrediction, setUserPrediction, onSubmit, accent, primary, secondary
}) {
  if (!scenarioObj) return null;

  return (
    <div style={{
      padding: '0 19px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#191e2f', borderRadius: 12, padding: '18px 16px',
        boxShadow: `0 1.2px 8px ${secondary}30`, marginBottom: 25,
        minWidth: 220, maxWidth: 440,
      }}>
        <div style={{ color: accent, fontWeight: 700, fontSize: 17, marginBottom: 5 }}>
          {scenarioObj.question}
        </div>
        <div style={{ color: "#aaf", fontWeight: 400, fontSize: 13, marginBottom: 4, opacity: 0.8 }}>
          {scenarioObj.context}
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 18 }}>
          <button
            style={answerBtnStyle(accent, userPrediction === 'yes')}
            onClick={() => setUserPrediction('yes')}
            aria-pressed={userPrediction === 'yes'}
          >
            Yes
          </button>
          <button
            style={answerBtnStyle(accent, userPrediction === 'no')}
            onClick={() => setUserPrediction('no')}
            aria-pressed={userPrediction === 'no'}
          >
            No
          </button>
        </div>
      </div>
      <button
        style={{
          marginTop: 5,
          background: accent, color: '#181d34', border: 'none', borderRadius: 8, padding: '11px 40px',
          fontWeight: 800, fontSize: 18, opacity: userPrediction ? 1 : 0.55,
          cursor: userPrediction ? 'pointer' : 'not-allowed',
          boxShadow: `0 2px 12px ${accent}2B`
        }}
        disabled={!userPrediction}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}

function answerBtnStyle(accent, active) {
  return {
    background: active ? accent : '#181e32',
    color: active ? '#181d34' : '#e2eaff',
    border: `2px solid ${accent}`,
    padding: '10px 26px',
    borderRadius: 8,
    fontWeight: 800,
    fontSize: 16,
    outline: 'none',
    cursor: 'pointer',
    boxShadow: active ? `0 2px 14px ${accent}42` : 'none',
    transition: 'background 0.18s, color 0.18s'
  }
}
