import React, { useState } from 'react';

// Simulate OpenAI analysis (returns result, plus batsman/bowler dummy stats)
async function getAIAnalysis(scenario, userPrediction) {
  return new Promise(resolve => setTimeout(() => {
    resolve({
      verdict: userPrediction === 'yes' ? 'Correct! Batting sides win 60% from here.' : 'Incorrect. Historically, teams win from here 60% of the time!',
      facts: [
        'Batsmen strike rate in 19th-20th overs hovers around 155.',
        'Bowler economy rises above 11 per over in these situations.'
      ],
      summary: 'Chasing sides have succeeded more than half the time in similar last-over positions in T20s.',
      batsmanStats: { name: 'Suryakumar Yadav', runs: [6, 4, 0, 2, 1, 0], balls: [1, 1, 1, 1, 1, 1] },
      bowlerStats: { name: 'Pat Cummins', dotBalls: [1, 0, 1, 1, 1, 0], runsGiven: [0, 2, 1, 6, 1, 2] }
    });
  }, 1150));
}

// PUBLIC_INTERFACE
/**
 * Step 4: Show analysis results from AI, including sample historical insights and stats.
 */
export default function AnalysisPanel({
  scenarioObj, userPrediction, analysisResult, setAnalysisResult,
  onContinue, loading, setLoading, accent, primary, secondary
}) {
  const [err, setErr] = useState(null);

  // PUBLIC_INTERFACE
  async function handleAIAnalysis() {
    setLoading(true); setErr(null);
    try {
      const result = await getAIAnalysis(scenarioObj, userPrediction);
      setAnalysisResult(result);
    } catch (e) {
      setErr('Error fetching analysis.');
    }
    setLoading(false);
  }

  React.useEffect(() => {
    if (!analysisResult && scenarioObj && userPrediction) {
      handleAIAnalysis();
    }
    // eslint-disable-next-line
  }, [scenarioObj, userPrediction]);

  if (loading || !analysisResult) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
        <div className="spinning" style={{
          border: `4px solid ${secondary}60`,
          borderTop: `4px solid ${accent}`,
          borderRadius: '50%',
          width: 44, height: 44,
          animation: 'spin 1s linear infinite',
          marginBottom: 12
        }} />
        <div style={{ color: accent, fontWeight: 700, marginBottom: 2 }}>AI Analysis...</div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 21px' }}>
      <div style={{
        background: '#151c28',
        borderRadius: 13,
        marginBottom: 12,
        padding: '16px',
        boxShadow: `0 1.5px 12px ${secondary}25`
      }}>
        <div style={{ color: accent, fontWeight: 700, fontSize: 18, marginBottom: 3 }}>Analysis Result</div>
        <div style={{ color: analysisResult.verdict.startsWith('Correct') ? '#26ff7d' : '#ff194a', fontWeight: 800, fontSize: 18, margin: '6px 0' }}>
          {analysisResult.verdict}
        </div>
        <div style={{ color: '#bfe6ff', fontWeight: 500, margin: '5px 0 9px 0', fontSize: 16 }}>
          {analysisResult.summary}
        </div>
        <ul style={{ color: '#ffc', fontWeight: 600, marginLeft: 20, fontSize: 14 }}>
          {analysisResult.facts.map((fact, i) => <li key={i}>{fact}</li>)}
        </ul>
      </div>
      <button
        onClick={() => onContinue(analysisResult.batsmanStats, analysisResult.bowlerStats)}
        style={{
          background: accent, color: '#181d36', border: 'none', borderRadius: 8, padding: '11px 40px',
          fontWeight: 800, fontSize: 17, boxShadow: `0 2px 12px ${accent}2B`, width: '100%'
        }}>
        Show Charts
      </button>
    </div>
  );
}

