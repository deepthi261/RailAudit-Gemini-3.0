import React, { useState, useEffect } from 'react';
import '../App.css';

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Mission Control: FRA Oversight",
            text: "Executing autonomous 49 CFR Part 229 compliance checks. The system integrates raw telemetry from Class I & Amtrak networks, cross-referencing Tier 4 emission standards against fiscal operating ratios to ensure federal grant eligibility.",
            statLabel: "System Status",
            statValue: "ACTIVE MONITORING"
        },
        {
            id: 2,
            title: "Gemini 3.0: Neural Reasoning",
            text: "Utilizing Chain-of-Thought processing to audit financial anomalies. Unlike regex parsers, the Agent understands 'Capital vs Operating' context, flagging variances in fuel burn rates and crew scheduling optimization logic.",
            statLabel: "Nodes Online",
            statValue: "NYP • CHI • LAX"
        },
        {
            id: 3,
            title: "Agency Compliance Sentinel",
            text: "Real-time enforcement of Congressional Budget Office (CBO) targets. The module proactively identifies PRIIA Sec 209 subsidy gaps and suggests immediate corrective actions for RRIF loan repayment schedules.",
            statLabel: "Protocol",
            statValue: "FRA-2024-STD"
        }
    ];

    // Auto-rotate slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="hero-carousel">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                >
                    {/* Left Side: Text Content */}
                    <div className="slide-content-side">
                        <h2>{slide.title}</h2>
                        <p>{slide.text}</p>
                        <div className="intro-stats-mini">
                            <div className="intro-stat">
                                <span className="intro-label">{slide.statLabel}</span>
                                <span className="intro-value highlight">{slide.statValue}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image Visualization */}
                    <div className="slide-image-side" style={{
                        filter: `hue-rotate(${index * 45}deg) saturate(1.2)`
                    }}>
                        {/* The image is handled via CSS background on this div */}
                    </div>
                </div>
            ))}

            {/* Dots navigation */}
            <div style={{ position: 'absolute', bottom: '15px', left: '2rem', zIndex: 3 }}>
                {slides.map((_, idx) => (
                    <span
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: idx === currentSlide ? '#58a6ff' : 'rgba(255,255,255,0.3)',
                            marginRight: '8px',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
