/**
 * Dashboard Component
 * Displays summary statistics and correlations
 */

import React, { useMemo } from 'react';
import {
  getAverageWellbeing,
  getUniqueMedications,
  getMedicationCorrelation
} from '../utils/analytics';

const Dashboard = ({ entries }) => {
  /**
   * Calculate overall statistics
   */
  const stats = useMemo(() => {
    const avgWellbeing = getAverageWellbeing(entries);
    const uniqueMeds = getUniqueMedications(entries);
    const totalEntries = entries.length;

    return {
      avgWellbeing,
      uniqueMeds,
      totalEntries,
      medicationCount: uniqueMeds.length
    };
  }, [entries]);

  /**
   * Calculate correlations for each medication
   */
  const correlations = useMemo(() => {
    if (stats.uniqueMeds.length === 0) return [];

    return stats.uniqueMeds
      .map(med => getMedicationCorrelation(entries, med))
      .filter(corr => corr.countWithMed >= 2) // Only show if taken at least twice
      .sort((a, b) => parseFloat(b.difference) - parseFloat(a.difference));
  }, [entries, stats.uniqueMeds]);

  /**
   * Determine correlation interpretation
   * @param {number} difference - Difference in well-being scores
   * @returns {Object} Interpretation with text and class
   */
  const getCorrelationInterpretation = (difference) => {
    const diff = parseFloat(difference);
    if (diff > 1) {
      return { text: 'Strong Positive', class: 'correlation-positive' };
    } else if (diff > 0.3) {
      return { text: 'Positive', class: 'correlation-positive' };
    } else if (diff < -1) {
      return { text: 'Strong Negative', class: 'correlation-negative' };
    } else if (diff < -0.3) {
      return { text: 'Negative', class: 'correlation-negative' };
    } else {
      return { text: 'Neutral', class: 'correlation-neutral' };
    }
  };

  if (entries.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <p>Start logging entries to see your dashboard!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>

      {/* Summary statistics cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalEntries}</div>
          <div className="stat-label">Total Entries</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.medicationCount}</div>
          <div className="stat-label">Unique Medications</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.avgWellbeing}</div>
          <div className="stat-label">Average Well-being</div>
        </div>
      </div>

      {/* Correlations section */}
      {correlations.length > 0 && (
        <div className="correlations-section">
          <h3>Medication-Wellbeing Correlations</h3>
          <p className="section-description">
            How each medication correlates with your well-being scores
          </p>

          <div className="correlation-list">
            {correlations.map((corr, idx) => {
              const interpretation = getCorrelationInterpretation(corr.difference);
              return (
                <div key={idx} className="correlation-card">
                  <div className="correlation-header">
                    <h4>{corr.medication}</h4>
                    <span className={`correlation-badge ${interpretation.class}`}>
                      {interpretation.text}
                    </span>
                  </div>

                  <div className="correlation-details">
                    <div className="correlation-stat">
                      <span className="stat-label">With medication:</span>
                      <span className="stat-value">{corr.avgWithMed}/10</span>
                      <span className="stat-count">({corr.countWithMed} entries)</span>
                    </div>

                    <div className="correlation-stat">
                      <span className="stat-label">Without medication:</span>
                      <span className="stat-value">{corr.avgWithoutMed}/10</span>
                      <span className="stat-count">({corr.countWithoutMed} entries)</span>
                    </div>

                    <div className="correlation-stat highlight">
                      <span className="stat-label">Difference:</span>
                      <span className="stat-value">
                        {corr.difference > 0 ? '+' : ''}{corr.difference}
                      </span>
                    </div>
                  </div>

                  <div className="correlation-note">
                    {parseFloat(corr.difference) > 0 ? (
                      <p>✓ Your well-being tends to be higher when taking this medication</p>
                    ) : parseFloat(corr.difference) < 0 ? (
                      <p>⚠️ Your well-being tends to be lower when taking this medication</p>
                    ) : (
                      <p>○ No significant correlation observed</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="correlation-disclaimer">
            <small>
              <strong>Note:</strong> These correlations are observational and do not establish 
              causation. Always consult with healthcare professionals about your medications.
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
