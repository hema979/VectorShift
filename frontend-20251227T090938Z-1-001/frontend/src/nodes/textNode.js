// textNode.js
// Enhanced with dynamic resizing and variable handles (Part 3)

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables from text using regex
  useEffect(() => {
    // Match {{variableName}} pattern
    const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1].trim());

    // Remove duplicates
    const uniqueVars = [...new Set(extractedVars)];
    setVariables(uniqueVars);
  }, [currText]);

  // Calculate dynamic dimensions based on text content
  const calculateDimensions = () => {
    const baseWidth = 220;
    const baseHeight = 100;
    const charWidth = 8;
    const lineHeight = 20;

    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length), 10);
    const numLines = lines.length;

    const width = Math.max(baseWidth, Math.min(maxLineLength * charWidth + 40, 400));
    const height = Math.max(baseHeight, numLines * lineHeight + 80);

    return { width, height };
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  const { width, height } = calculateDimensions();

  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      border: '2px solid #10b981',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#d1fae5',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease'
    }}>
      {/* Dynamic input handles for variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            background: '#10b981'
          }}
          title={variable}
        />
      ))}

      {/* Node Title */}
      <div style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#047857',
        borderBottom: '1px solid #6ee7b7',
        paddingBottom: '5px'
      }}>
        Text
      </div>

      {/* Description */}
      <div style={{
        fontSize: '11px',
        color: '#065f46',
        marginBottom: '8px'
      }}>
        Use {`{{variableName}}`} for dynamic inputs
      </div>

      {/* Text Input */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          marginBottom: '4px',
          color: '#047857'
        }}>
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            minHeight: '50px',
            border: '1px solid #6ee7b7',
            borderRadius: '4px',
            padding: '6px',
            fontSize: '12px',
            fontFamily: 'monospace',
            resize: 'none',
            backgroundColor: '#fff'
          }}
          rows={Math.max(3, currText.split('\n').length)}
        />
      </div>

      {/* Variables display */}
      {variables.length > 0 && (
        <div style={{
          fontSize: '10px',
          color: '#059669',
          marginTop: '5px',
          fontStyle: 'italic'
        }}>
          Variables: {variables.join(', ')}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ background: '#10b981' }}
        title="Output"
      />
    </div>
  );
}
