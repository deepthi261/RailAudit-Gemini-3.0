import React, { useState } from 'react';
import '../App.css';

const NetworkMap = () => {
    const [activeNode, setActiveNode] = useState(null);

    const nodes = [
        { id: 'NYP', x: 400, y: 150, label: 'New York (Penn)', status: 'optimal' },
        { id: 'CHI', x: 250, y: 180, label: 'Chicago Union', status: 'warning' },
        { id: 'WAS', x: 380, y: 220, label: 'Washington DC', status: 'optimal' },
        { id: 'LAX', x: 100, y: 300, label: 'Los Angeles', status: 'optimal' },
        { id: 'DAL', x: 220, y: 350, label: 'Dallas', status: 'optimal' }
    ];

    const connections = [
        ['NYP', 'CHI'], ['NYP', 'WAS'], ['CHI', 'DAL'], ['DAL', 'LAX'], ['CHI', 'LAX'], ['WAS', 'CHI']
    ];

    const getNode = (id) => nodes.find(n => n.id === id);

    return (
        <div className="network-map-container">
            <h3>Live Network Status (USA)</h3>
            <div className="map-wrapper">
                <svg viewBox="0 0 500 500" className="network-svg">
                    {/* Connections */}
                    {connections.map(([start, end], idx) => {
                        const n1 = getNode(start);
                        const n2 = getNode(end);
                        return (
                            <line
                                key={idx}
                                x1={n1.x} y1={n1.y}
                                x2={n2.x} y2={n2.y}
                                stroke="#30363d"
                                strokeWidth="2"
                                className="map-connection"
                            />
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <g
                            key={node.id}
                            onMouseEnter={() => setActiveNode(node)}
                            onMouseLeave={() => setActiveNode(null)}
                            className="map-node-group"
                        >
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r="8"
                                fill={node.status === 'optimal' ? '#238636' : '#d29922'}
                                className="map-node-dot"
                            />
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r="16"
                                fill="transparent"
                                stroke={node.status === 'optimal' ? '#238636' : '#d29922'}
                                strokeOpacity="0.4"
                                className="map-node-pulse"
                            />
                            <text
                                x={node.x + 15}
                                y={node.y + 5}
                                fill="#8b949e"
                                fontSize="10"
                                className="map-node-label"
                            >
                                {node.id}
                            </text>
                        </g>
                    ))}
                </svg>

                {activeNode && (
                    <div className="node-tooltip" style={{ top: activeNode.y, left: activeNode.x + 20 }}>
                        <strong>{activeNode.label}</strong>
                        <p>Status: {activeNode.status.toUpperCase()}</p>
                        <p>Traffic: {activeNode.status === 'optimal' ? '98%' : '76%'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NetworkMap;
