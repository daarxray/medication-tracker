/**
 * EntryList Component
 * Displays all medication entries in reverse chronological order
 */

import React from 'react';
import { format, parseISO } from 'date-fns';

const EntryList = ({ entries, onDelete }) => {
  /**
   * Format timestamp to readable date and time
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Formatted date and time
   */
  const formatDateTime = (timestamp) => {
    try {
      const date = parseISO(timestamp);
      return format(date, 'MMM dd, yyyy • hh:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  /**
   * Get color class based on well-being score
   * @param {number} score - Well-being score (1-10)
   * @returns {string} CSS class name
   */
  const getWellbeingColor = (score) => {
    if (score <= 3) return 'wellbeing-low';
    if (score <= 6) return 'wellbeing-medium';
    return 'wellbeing-high';
  };

  /**
   * Handle entry deletion with confirmation
   * @param {string} id - Entry ID
   * @param {string} timestamp - Entry timestamp for display
   */
  const handleDelete = (id, timestamp) => {
    if (window.confirm(`Delete entry from ${formatDateTime(timestamp)}?`)) {
      onDelete(id);
    }
  };

  // Sort entries by timestamp (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  if (sortedEntries.length === 0) {
    return (
      <div className="entry-list-container">
        <h2>Your Entries</h2>
        <div className="empty-state">
          <p>No entries yet. Start by logging your first medication or vitamin!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="entry-list-container">
      <h2>Your Entries ({sortedEntries.length})</h2>
      <div className="entry-list">
        {sortedEntries.map(entry => (
          <div key={entry.id} className="entry-card">
            
            {/* Entry header with timestamp and delete button */}
            <div className="entry-header">
              <div className="entry-time">{formatDateTime(entry.timestamp)}</div>
              <button 
                onClick={() => handleDelete(entry.id, entry.timestamp)}
                className="btn-delete"
                aria-label="Delete entry"
              >
                🗑️
              </button>
            </div>

            {/* Medications list */}
            <div className="entry-medications">
              <strong>Taken:</strong>
              <div className="medication-tags">
                {entry.medications && entry.medications.map((med, idx) => (
                  <span key={idx} className="medication-tag">
                    {med}
                  </span>
                ))}
              </div>
            </div>

            {/* Well-being score */}
            <div className="entry-wellbeing">
              <strong>Well-being:</strong>
              <span className={`wellbeing-badge ${getWellbeingColor(entry.wellbeing)}`}>
                {entry.wellbeing}/10
              </span>
            </div>

            {/* Notes if present */}
            {entry.notes && (
              <div className="entry-notes">
                <strong>Notes:</strong>
                <p>{entry.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryList;
