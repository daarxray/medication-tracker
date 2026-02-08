/**
 * Charts Component
 * Visualizes medication frequency and well-being trends using Chart.js
 */

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  getMedicationFrequency,
  getWellbeingTrend,
  getWellbeingDistribution
} from '../utils/analytics';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ entries }) => {
  /**
   * Prepare data for medication frequency bar chart
   */
  const medicationChartData = useMemo(() => {
    const frequency = getMedicationFrequency(entries);
    const labels = Object.keys(frequency);
    const data = Object.values(frequency);

    return {
      labels,
      datasets: [{
        label: 'Times Taken',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  }, [entries]);

  /**
   * Prepare data for well-being trend line chart
   */
  const wellbeingTrendData = useMemo(() => {
    const trend = getWellbeingTrend(entries, 30);
    const labels = trend.map(t => t.date);
    const data = trend.map(t => parseFloat(t.avgWellbeing));

    return {
      labels,
      datasets: [{
        label: 'Average Well-being',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true
      }]
    };
  }, [entries]);

  /**
   * Prepare data for well-being distribution pie chart
   */
  const wellbeingDistributionData = useMemo(() => {
    const distribution = getWellbeingDistribution(entries);
    const labels = Object.keys(distribution).map(k => `Score ${k}`);
    const data = Object.values(distribution);

    return {
      labels,
      datasets: [{
        label: 'Number of Entries',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderWidth: 1
      }]
    };
  }, [entries]);

  // Chart options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Medication/Vitamin Frequency'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Well-being Trend (Last 30 Days)'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Well-being Score Distribution'
      }
    }
  };

  if (entries.length === 0) {
    return (
      <div className="charts-container">
        <div className="empty-state">
          <p>Add some entries to see visualizations and analytics!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <h2>Analytics & Insights</h2>
      
      <div className="charts-grid">
        {/* Medication Frequency Chart */}
        <div className="chart-card">
          <div className="chart-wrapper">
            <Bar data={medicationChartData} options={barOptions} />
          </div>
        </div>

        {/* Well-being Trend Chart */}
        <div className="chart-card">
          <div className="chart-wrapper">
            <Line data={wellbeingTrendData} options={lineOptions} />
          </div>
        </div>

        {/* Well-being Distribution Chart */}
        <div className="chart-card">
          <div className="chart-wrapper">
            <Pie data={wellbeingDistributionData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
