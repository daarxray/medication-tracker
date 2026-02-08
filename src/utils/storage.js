/**
 * Storage utility for managing medication entries in localStorage
 * Provides CRUD operations for entry data
 */

const STORAGE_KEY = 'medication_entries';

/**
 * Get all entries from localStorage
 * @returns {Array} Array of entry objects
 */
export const getEntries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/**
 * Save a new entry to localStorage
 * @param {Object} entry - Entry object with medication, wellbeing, notes, timestamp
 * @returns {Object} The saved entry with generated ID
 */
export const saveEntry = (entry) => {
  try {
    const entries = getEntries();
    const newEntry = {
      id: Date.now().toString(), // Generate unique ID
      timestamp: new Date().toISOString(),
      ...entry
    };
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    throw error;
  }
};

/**
 * Update an existing entry
 * @param {string} id - Entry ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated entry
 */
export const updateEntry = (id, updates) => {
  try {
    const entries = getEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return entries[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error;
  }
};

/**
 * Delete an entry by ID
 * @param {string} id - Entry ID to delete
 * @returns {boolean} Success status
 */
export const deleteEntry = (id) => {
  try {
    const entries = getEntries();
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting entry:', error);
    return false;
  }
};

/**
 * Clear all entries (for testing/reset)
 * @returns {boolean} Success status
 */
export const clearAllEntries = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing entries:', error);
    return false;
  }
};
