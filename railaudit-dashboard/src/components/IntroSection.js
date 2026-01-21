import React from 'react';
import '../App.css';

function IntroSection() {
    return (
        <div className="intro-section">
            <div className="intro-content">
                <h2>Mission Control for USA Oversight</h2>
                <p>
                    Welcome to the <strong>RailAudit AI 3.0</strong> interface.
                    This agentic system performs real-time ingestion, computation, and compliance auditing
                    of US Railway financial streams against <strong>FRA & Amtrak OIG</strong> standards.
                </p>
                <div className="intro-stats">
                    <div className="intro-stat">
                        <span className="intro-label">System Status</span>
                        <span className="intro-value success">Active</span>
                    </div>
                    <div className="intro-stat">
                        <span className="intro-label">Agent Model</span>
                        <span className="intro-value">Gemini 2.0 Flash</span>
                    </div>
                    <div className="intro-stat">
                        <span className="intro-label">Protocol</span>
                        <span className="intro-value">FRA / 49 CFR</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroSection;
