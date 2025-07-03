import React, { useState } from 'react';

// Simulate OpenAI call
async function getAIScenario(matchDetails) {
  return new Promise(resolve => setTimeout(() => {
    resolve({
      scenario: `It's the last over. ${matchDetails.teams}, playing at ${matchDetails.location}, need 12 runs to win from 6 balls.`,
      question: 'Will the batting team win from here?',
      context: `This scenario is generated considering recent T20 close finishes.`,
      aiRaw: `AI generated scenario for ${matchDetails.teams}: ...`,
    });
  }, 1400));
}

// PUBLIC_INTERFACE
/**
 * Step 2 - Requests/generates a scenario and question using background OpenAI API.
 */
export default function ScenarioPanel({
  matchDetails, scenarioObj, setScenarioObj,
  loading, setLoading,
  onContinue, accent, primary, secondary
}) {
  const [aiErr, setAIErr] = useState(null);

  // PUBLIC_INTERFACE
  async function handleAICall() {
    setAIErr(null);
    setLoading(true);
    try {
      // Placeholder for true OpenAI API call
      const result = await getAIScenario(matchDetails);
      setScenarioObj(result);
    } catch (e) {
      setAIErr('Failed to fetch scenario.');
      setScenarioObj(null);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    if (!scenarioObj) handleAICall();
  // eslint-disable-next-line
  }, []);

  if (loading || !scenarioObj) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32 }}>
        <div className="spinning" style={{
          border: `4px solid ${secondary}55`,
          borderTop: `4px solid ${accent}`,
          borderRadius: '50%',
          width: 44, height: 44,
          animation: 'spin 1s linear infinite',
          marginBottom: 16
        }} />
        <div style={{ color: accent, fontWeight: 700, marginBottom: 2 }}>
          Generating scenario...
        </div>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 19px' }}>
      <div style={{
        background: '#151c28', borderRadius: 12, padding: '18px 16px',
        boxShadow: `0 1.5px 15px ${secondary}33`, marginBottom: 14
      }}>
        <div style={{ color: accent, fontWeight: 700, fontSize: 18 }}>
          Scenario
        </div>
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 16, margin: '7px 0 0 0' }}>
          {scenarioObj.scenario}
        </div>
        <div style={{ color: "#bbd", fontWeight: 500, fontSize: 13, marginTop: 7, opacity: 0.7 }}>
          <b style={{ color: accent }}>Q:</b> {scenarioObj.question}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button onClick={onContinue}
          style={{
            background: accent, color: '#191b28', border: 'none', borderRadius: 8, padding: '11px 30px', fontWeight: 800,
            fontSize: 17, cursor: 'pointer', boxShadow: `0 2px 14px ${accent}44`
          }}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
