import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';
import HeroCarousel from './components/HeroCarousel';
import NetworkMap from './components/NetworkMap';
import TechOverview from './components/TechOverview';
import './App.css';

// Metric Definitions with "Interesting Knowledge" (USA Context)
const METRIC_DEFINITIONS = {
  operating_ratio: "💡 Knowledge: In the US Rail Industry (Class I), Operating Ratio (OR) is the gold standard of efficiency. Wall Street targets ~60%, but for State-Supported routes (Amtrak/Commuter), a ratio below 100% or meeting the Congressional subsidy target is key.",
  gap_to_ideal: "📉 Insight: Fiscal distance to the target set by the Surface Transportation Board (STB) or Congressional Appropriations. A positive gap indicates a need for subsidy alignment.",
  gross_traffic: "🚂 Context: Total revenue from Ticket Sales (NEC/Long Distance), State Subsidy Payments (PRIIA Sec 209), and Freight trackage rights fees.",
  working_expenses: "⚙️ Breakdown: Direct operating costs including T&E Crew (Train & Engine) wages, Diesel Fuel (Tier 4), MOW (Maintenance of Way), and RRIF Loan servicing.",
  status: "✅ Regulation: Checks compliance with FRA 49 CFR Safety Standards and EPA Tier 4 Emissions protocols for locomotive fleet operations.",
  fuel_variance: "⛽ Variance Analysis: Deviation between budgeted diesel consumption (gallons) and actual burn rate, adjusted for ton-miles transported.",
  loan_recovery: "🏦 Fiscal Health: Repayment status of RRIF (Railroad Rehabilitation & Improvement Financing) loans and specific Amtrak Grant agreements."
};

function MetricRow({ label, value, type, metricKey }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="stat-row-container"
      onClick={() => setShowInfo(!showInfo)}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div className="stat-row">
        <span className="stat-label">
          {label}
          <span className="info-icon">?</span>
        </span>
        <span className={`stat-value ${type || ''}`}>{value}</span>
      </div>

      {showInfo && (
        <div className="metric-description">
          {METRIC_DEFINITIONS[metricKey]}
        </div>
      )}
    </div>
  );
}

// Gauge Chart Component for Operating Ratio
const OperatingRatioGauge = ({ value }) => {
  const data = [
    { name: 'Efficiency', value: value },
    { name: 'Gap', value: 100 - value }
  ];
  const COLORS = [value > 92.5 ? '#f85149' : '#238636', '#30363d'];

  return (
    <div className="chart-container">
      <h4>Operating Ratio Health</h4>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="gauge-label">{value}%</div>
      </div>
      <p className="chart-caption">
        {value > 92.5 ? '⚠️ Above Target (92.5%)' : '✅ Efficient'}
      </p>
    </div>
  );
};

// Bar Chart for Financial Overview
const FinancialBarChart = ({ revenue, expenses }) => {
  const data = [
    { name: 'Revenue', amount: revenue, fill: '#58a6ff' },
    { name: 'Expenses', amount: expenses, fill: '#d29922' }
  ];

  return (
    <div className="chart-container">
      <h4>Revenue vs Expenses</h4>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8b949e" fontSize={12} />
            <YAxis stroke="#8b949e" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
              itemStyle={{ color: '#c9d1d9' }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    // DYNAMIC LINKING (Smart Switch)
    const API_BASE = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://railaudit-backend-o7vz2fgdrq-uc.a.run.app';

    try {
      const response = await fetch(`${API_BASE}/audit`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Audit failed');
      }

      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
      // Fallback if needed, but error display is standard
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="model-details-banner">GEMINI 3.0 FLASH MODEL • FRA STANDARD PROTOCOL • v3.0</div>
        <div className="app-logo-container">
          <div className="app-logo-crop" title="RailAudit"></div>
        </div>
        <h2>Gemini 3 Workflow</h2>
        <p className="header-description">
          <strong>Project RailAudit:</strong> An autonomous financial oversight system powered by Gemini 3.0.
          Processing <strong>Live Ticket Streaming</strong> data from major US railway hubs to audit against
          FRA standards and Congressional budget targets in real-time.
        </p>
      </header>

      <div className="main-content">

        {/* New Slideshow Section */}
        <HeroCarousel />

        <section className="upload-card">
          <h3>System Data Feed</h3>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="audit-button"
          >
            {loading ? 'Processing Agentic Workflow...' : 'Run Audit Protocol'}
          </button>
        </section>

        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="results-grid">
            {/* Visual Charts Section - NEW */}
            <div className="metric-card visual-card">
              <h3>Financial Visuals</h3>
              <div className="charts-wrapper">
                <OperatingRatioGauge value={result.operating_ratio} />
                <FinancialBarChart
                  revenue={result.gross_traffic_receipts}
                  expenses={result.total_working_expenses}
                />
              </div>
            </div>

            <div className="metric-card">
              <h3>Financial Performance</h3>
              <MetricRow
                label="Operating Ratio"
                value={`${result.operating_ratio}%`}
                type="highlight"
                metricKey="operating_ratio"
              />
              <MetricRow
                label="Gap to Ideal"
                value={`${result.operating_ratio_gap}%`}
                type="warning"
                metricKey="gap_to_ideal"
              />
              <MetricRow
                label="Gross Traffic"
                value={`$${result.gross_traffic_receipts?.toLocaleString()}`}
                metricKey="gross_traffic"
              />
              <MetricRow
                label="Working Expenses"
                value={`$${result.total_working_expenses?.toLocaleString()}`}
                metricKey="working_expenses"
              />
            </div>

            <div className="metric-card">
              <h3>Compliance & Agency</h3>
              <MetricRow
                label="Status"
                value={result.compliance_status}
                type="success"
                metricKey="status"
              />
              <MetricRow
                label="Fuel Variance"
                value={result.fuel_expense_variance}
                metricKey="fuel_variance"
              />
              <MetricRow
                label="Loan Recovery"
                value={result.loan_recovery_status}
                metricKey="loan_recovery"
              />
            </div>
            {/* Network Map Section */}
            <div className="metric-card visual-card">
              <NetworkMap />
            </div>
          </div>
        )}

        {result && (
          <div className="workflow-nav">
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              className="workflow-link-btn"
            >
              View Backend Experience (Port 5001) ➔
            </a>
          </div>
        )}

      </div>

      {/* Technical Architecture Section */}
      <TechOverview />

    </div>
  );
}

export default App;
