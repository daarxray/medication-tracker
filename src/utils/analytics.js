/**
 * Analytics utility for calculating correlations and statistics
 * from medication and well-being data
 */

import { format, parseISO, startOfDay, subDays, isAfter } from 'date-fns';

/**
 * Calculate frequency of each medication/vitamin
 * @param {Array} entries - All entries
 * @returns {Object} Medication names with their counts
 */
export const getMedicationFrequency = (entries) => {
  const frequency = {};
  entries.forEach(entry => {
    const medications = entry.medications || [];
    medications.forEach(med => {
      frequency[med] = (frequency[med] || 0) + 1;
    });
  });
  return frequency;
};

/**
 * Calculate average well-being score
 * @param {Array} entries - Entries to analyze
 * @returns {number} Average well-being score
 */
export const getAverageWellbeing = (entries) => {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + (entry.wellbeing || 0), 0);
  return (sum / entries.length).toFixed(2);
};

/**
 * Get well-being trend over time (last N days)
 * @param {Array} entries - All entries
 * @param {number} days - Number of days to analyze
 * @returns {Array} Array of {date, avgWellbeing} objects
 */
export const getWellbeingTrend = (entries, days = 30) => {
  const cutoffDate = subDays(new Date(), days);
  const recentEntries = entries.filter(entry => 
    isAfter(parseISO(entry.timestamp), cutoffDate)
  );

  // Group by day
  const dailyData = {};
  recentEntries.forEach(entry => {
    const day = format(startOfDay(parseISO(entry.timestamp)), 'yyyy-MM-dd');
    if (!dailyData[day]) {
      dailyData[day] = { scores: [], count: 0 };
    }
    dailyData[day].scores.push(entry.wellbeing || 0);
    dailyData[day].count++;
  });

  // Calculate averages
  const trend = Object.keys(dailyData).map(day => ({
    date: day,
    avgWellbeing: (
      dailyData[day].scores.reduce((a, b) => a + b, 0) / 
      dailyData[day].count
    ).toFixed(2),
    count: dailyData[day].count
  }));

  return trend.sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Correlate specific medication with well-being
 * @param {Array} entries - All entries
 * @param {string} medicationName - Name of medication to analyze
 * @returns {Object} Correlation statistics
 */
export const getMedicationCorrelation = (entries, medicationName) => {
  const withMed = entries.filter(e => 
    e.medications && e.medications.includes(medicationName)
  );
  const withoutMed = entries.filter(e => 
    !e.medications || !e.medications.includes(medicationName)
  );

  return {
    medication: medicationName,
    avgWithMed: getAverageWellbeing(withMed),
    avgWithoutMed: getAverageWellbeing(withoutMed),
    countWithMed: withMed.length,
    countWithoutMed: withoutMed.length,
    difference: (
      getAverageWellbeing(withMed) - getAverageWellbeing(withoutMed)
    ).toFixed(2)
  };
};

/**
 * Get all unique medications from entries
 * @param {Array} entries - All entries
 * @returns {Array} Sorted array of unique medication names
 */
export const getUniqueMedications = (entries) => {
  const meds = new Set();
  entries.forEach(entry => {
    if (entry.medications) {
      entry.medications.forEach(med => meds.add(med));
    }
  });
  return Array.from(meds).sort();
};

/**
 * Get entries for a specific date range
 * @param {Array} entries - All entries
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered entries
 */
export const getEntriesInRange = (entries, startDate, endDate) => {
  return entries.filter(entry => {
    const entryDate = parseISO(entry.timestamp);
    return isAfter(entryDate, startDate) && isAfter(endDate, entryDate);
  });
};

/**
 * Calculate well-being distribution (how many entries at each score)
 * @param {Array} entries - All entries
 * @returns {Object} Distribution of well-being scores
 */
export const getWellbeingDistribution = (entries) => {
  const distribution = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
    6: 0, 7: 0, 8: 0, 9: 0, 10: 0
  };
  
  entries.forEach(entry => {
    const score = entry.wellbeing || 0;
    if (score >= 1 && score <= 10) {
      distribution[score]++;
    }
  });
  
  return distribution;
};
