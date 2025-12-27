// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#1f2937',
            borderBottom: '2px solid #374151',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                color: '#f9fafb',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600'
            }}>Pipeline Builder</h2>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
