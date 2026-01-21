import React from 'react';
import '../App.css';

const TechOverview = () => {
    const techs = [
        {
            icon: "🧠",
            title: "Gemini 3.0 Core",
            desc: "Autonomous Agent implementation using the latest Flash model for regulatory reasoning."
        },
        {
            icon: "🐍",
            title: "Python Flask Nexus",
            desc: "Secure backend orchestration layer handling CSV integration and API routing."
        },
        {
            icon: "⚛️",
            title: "React 18 Dashboard",
            desc: "High-performance frontend with dynamic charting and interactive neural maps."
        },
        {
            icon: "📜",
            title: "FRA Compliance Engine",
            desc: "Real-time checking against 49 CFR Part 229 & EPA Tier 4 standards."
        }
    ];

    return (
        <div className="tech-overview-container">
            <h3>System Architecture</h3>
            <div className="tech-grid">
                {techs.map((tech, idx) => (
                    <div key={idx} className="tech-card">
                        <div className="tech-icon">{tech.icon}</div>
                        <div className="tech-info">
                            <h4>{tech.title}</h4>
                            <p>{tech.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechOverview;
