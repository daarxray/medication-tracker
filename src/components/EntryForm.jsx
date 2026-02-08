/**
 * EntryForm Component
 * Form for adding new medication/vitamin entries with well-being tracking
 */

import React, { useState } from 'react';

const EntryForm = ({ onSave }) => {
  // Form state management
  const [medications, setMedications] = useState('');
  const [wellbeing, setWellbeing] = useState(5);
  const [notes, setNotes] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse medications from comma-separated string
    const medArray = medications
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    if (medArray.length === 0) {
      alert('Please enter at least one medication or vitamin');
      return;
    }

    // Create entry object
    const entry = {
      medications: medArray,
      wellbeing: parseInt(wellbeing),
      notes: notes.trim()
    };

    // Call parent save handler
    onSave(entry);

    // Reset form
    setMedications('');
    setWellbeing(5);
    setNotes('');
  };

  return (
    <div className="entry-form-container">
      <h2>Log New Entry</h2>
      <form onSubmit={handleSubmit} className="entry-form">
        
        {/* Medications input */}
        <div className="form-group">
          <label htmlFor="medications">
            Medications/Vitamins <span className="required">*</span>
          </label>
          <input
            type="text"
            id="medications"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="e.g., Vitamin D, Aspirin, Omega-3 (separate with commas)"
            className="form-input"
            required
          />
          <small className="form-help">Enter multiple items separated by commas</small>
        </div>

        {/* Well-being slider */}
        <div className="form-group">
          <label htmlFor="wellbeing">
            Well-being Level: <strong>{wellbeing}/10</strong>
          </label>
          <input
            type="range"
            id="wellbeing"
            min="1"
            max="10"
            value={wellbeing}
            onChange={(e) => setWellbeing(e.target.value)}
            className="form-range"
          />
          <div className="range-labels">
            <span>1 (Poor)</span>
            <span>5 (Moderate)</span>
            <span>10 (Excellent)</span>
          </div>
        </div>

        {/* Notes textarea */}
        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional observations about your well-being, side effects, etc."
            className="form-textarea"
            rows="4"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
