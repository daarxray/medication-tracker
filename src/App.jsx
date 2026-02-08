/**
 * Main App Component
 * Root component managing application state and routing between views
 */

import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import { getEntries, saveEntry, deleteEntry } from './utils/storage';

const App = () => {
  // Application state
  const [entries, setEntries] = useState([]);
  const [activeView, setActiveView] = useState('log'); // 'log', 'dashboard', 'charts', 'list'

  /**
   * Load entries from localStorage on component mount
   */
  useEffect(() => {
    const loadedEntries = getEntries();
    setEntries(loadedEntries);
  }, []);

  /**
   * Handle saving a new entry
   * @param {Object} entry - New entry data
   */
  const handleSaveEntry = (entry) => {
    try {
      const savedEntry = saveEntry(entry);
      setEntries(prevEntries => [...prevEntries, savedEntry]);
      alert('Entry saved successfully! ✓');
    } catch (error) {
      alert('Error saving entry. Please try again.');
      console.error('Save error:', error);
    }
  };

  /**
   * Handle deleting an entry
   * @param {string} id - Entry ID to delete
   */
  const handleDeleteEntry = (id) => {
    try {
      const success = deleteEntry(id);
      if (success) {
        setEntries(prevEntries => prevEntries.filter(e => e.id !== id));
      }
    } catch (error) {
      alert('Error deleting entry. Please try again.');
      console.error('Delete error:', error);
    }
  };

  /**
   * Render the active view based on navigation state
   */
  const renderActiveView = () => {
    switch (activeView) {
      case 'log':
        return <EntryForm onSave={handleSaveEntry} />;
      case 'dashboard':
        return <Dashboard entries={entries} />;
      case 'charts':
        return <Charts entries={entries} />;
      case 'list':
        return <EntryList entries={entries} onDelete={handleDeleteEntry} />;
      default:
        return <EntryForm onSave={handleSaveEntry} />;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>💊 Medication & Well-being Tracker</h1>
        <p className="app-subtitle">
          Track your medications and correlate them with your well-being
        </p>
      </header>

      {/* Navigation */}
      <nav className="app-nav">
        <button
          className={`nav-btn ${activeView === 'log' ? 'active' : ''}`}
          onClick={() => setActiveView('log')}
        >
          📝 Log Entry
        </button>
        <button
          className={`nav-btn ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-btn ${activeView === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveView('charts')}
        >
          📈 Charts
        </button>
        <button
          className={`nav-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => setActiveView('list')}
        >
          📋 All Entries
        </button>
      </nav>

      {/* Main content area */}
      <main className="app-main">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Your data is stored locally in your browser. 
          No information is sent to external servers.
        </p>
      </footer>
    </div>
  );
};

export default App;
