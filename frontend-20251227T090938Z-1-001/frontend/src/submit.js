// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({ nodes: state.nodes, edges: state.edges }));
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            // Prepare the pipeline data
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
            setShowModal(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: ${error.message}. Make sure the backend is running on http://localhost:8000`);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setResult(null);
    };

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: '#f9fafb',
                borderTop: '2px solid #e5e7eb'
            }}>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                        padding: '12px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                        backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease',
                        transform: isLoading ? 'scale(1)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.target.style.backgroundColor = '#2563eb';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLoading) {
                            e.target.style.backgroundColor = '#3b82f6';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }
                    }}
                >
                    {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
                </button>
            </div>

            {/* Result Modal */}
            {showModal && result && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '32px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        animation: 'slideUp 0.3s ease'
                    }}>
                        <h2 style={{
                            margin: '0 0 20px 0',
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1f2937'
                        }}>
                            Pipeline Analysis Results
                        </h2>

                        <div style={{
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                                paddingBottom: '12px',
                                borderBottom: '1px solid #e5e7eb'
                            }}>
                                <span style={{
                                    fontSize: '16px',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>Number of Nodes:</span>
                                <span style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: '#3b82f6'
                                }}>{result.num_nodes}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                                paddingBottom: '12px',
                                borderBottom: '1px solid #e5e7eb'
                            }}>
                                <span style={{
                                    fontSize: '16px',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>Number of Edges:</span>
                                <span style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: '#8b5cf6'
                                }}>{result.num_edges}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: '16px',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>Is DAG (Directed Acyclic Graph):</span>
                                <span style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: result.is_dag ? '#10b981' : '#ef4444',
                                    padding: '4px 12px',
                                    backgroundColor: result.is_dag ? '#d1fae5' : '#fee2e2',
                                    borderRadius: '6px'
                                }}>
                                    {result.is_dag ? '✓ Yes' : '✗ No'}
                                </span>
                            </div>
                        </div>

                        {!result.is_dag && (
                            <div style={{
                                backgroundColor: '#fef3c7',
                                border: '1px solid #fbbf24',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                color: '#92400e'
                            }}>
                                ⚠️ Warning: Your pipeline contains cycles. A valid pipeline should be a DAG.
                            </div>
                        )}

                        <button
                            onClick={closeModal}
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#fff',
                                backgroundColor: '#3b82f6',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#3b82f6';
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to { 
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}
