import React from 'react';
import Plot from 'react-plotly.js';

// PUBLIC_INTERFACE
/**
 * Chart visualization using Plotly. Shows stats for batsman and bowler in scenario.
 */
export default function ChartPanel({
  batsmanStats, bowlerStats, accent = '#FFD600', primary = '#0D47A1', secondary = '#1565C0'
}) {
  return (
    <div style={{
      padding: '0 4px', display: 'flex', flexDirection: 'column', gap: 13,
      alignItems: 'center', minWidth: 0
    }}>
      <div style={{
        background: '#131823',
        borderRadius: 13,
        marginBottom: 0,
        boxShadow: `0 1.5px 12px ${secondary}18`,
        padding: 13,
        width: '100%'
      }}>
        <h4 style={{ color: accent, margin: '2px 0 12px', fontWeight: 800, fontSize: 16, textAlign: 'left' }}>
          {batsmanStats?.name || 'Batsman'} Recent Scoring Pattern
        </h4>
        <Plot
          data={[
            {
              x: batsmanStats?.balls || [1,2,3,4,5,6],
              y: batsmanStats?.runs || [2,4,0,1,6,5],
              type: 'bar',
              marker: { color: accent },
              name: 'Runs/ball'
            }
          ]}
          layout={{
            autosize: true,
            plot_bgcolor: "#191c24",
            paper_bgcolor: "#191c24",
            font: { color: "#fff", size: 13 },
            margin: { t: 30, l: 30, r: 20, b: 40 },
            width: 440,
            height: 220,
            xaxis: { title: 'Balls This Over', tickmode: 'array', tickvals: batsmanStats?.balls },
            yaxis: { title: 'Runs' }
          }}
          config={{ displayModeBar: false }}
          style={{ width: "100%", minWidth: 210, maxWidth: 444 }}
        />
      </div>
      <div style={{
        background: '#141926',
        borderRadius: 13,
        marginBottom: 0,
        boxShadow: `0 1.5px 12px ${secondary}15`,
        padding: 13,
        width: '100%'
      }}>
        <h4 style={{ color: accent, margin: '2px 0 12px', fontWeight: 800, fontSize: 16, textAlign: 'left' }}>
          {bowlerStats?.name || 'Bowler'} Over-by-Over Breakdown
        </h4>
        <Plot
          data={[
            {
              x: bowlerStats?.dotBalls?.map((_, idx) => idx + 1) || [1,2,3,4,5,6],
              y: bowlerStats?.dotBalls || [1, 0, 1, 1, 1, 0],
              type: 'scatter',
              mode: 'lines+markers',
              line: { color: primary, width: 3 },
              marker: { color: accent, size: 8 },
              name: 'Dot balls'
            },
            {
              x: bowlerStats?.runsGiven?.map((_, idx) => idx + 1) || [1,2,3,4,5,6],
              y: bowlerStats?.runsGiven || [1, 6, 0, 3, 4, 2],
              type: 'bar',
              marker: { color: secondary, opacity: 0.66 },
              name: 'Runs given'
            }
          ]}
          layout={{
            autosize: true,
            plot_bgcolor: "#191c24",
            paper_bgcolor: "#191c24",
            font: { color: "#fff", size: 13 },
            margin: { t: 30, l: 30, r: 20, b: 40 },
            width: 440,
            height: 220,
            xaxis: { title: 'Balls This Over' },
            yaxis: { title: 'Dot Balls / Runs' }
          }}
          config={{ displayModeBar: false }}
          style={{width: "100%", minWidth: 210, maxWidth: 444}}
        />
      </div>
      <div style={{ marginTop: 20, width: '100%', textAlign: 'center' }}>
        <span style={{ color: accent, fontWeight: 700, fontSize: 16 }}>Live Analysis Complete!</span>
      </div>
    </div>
  );
}
