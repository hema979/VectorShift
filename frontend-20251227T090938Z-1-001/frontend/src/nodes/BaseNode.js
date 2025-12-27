// BaseNode.js
// A flexible abstraction for creating different node types with shared functionality

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

/**
 * BaseNode - A reusable component for creating custom nodes
 * 
 * @param {object} config - Configuration object for the node
 * @param {string} config.title - Node title displayed at the top
 * @param {array} config.fields - Array of field configurations
 * @param {array} config.inputs - Array of input handle configurations
 * @param {array} config.outputs - Array of output handle configurations
 * @param {function} config.onFieldChange - Callback for field changes
 * @param {object} config.styles - Custom styles for the node
 */

export const BaseNode = ({ id, data, config }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [fieldValues, setFieldValues] = useState({});

    // Initialize field values from data or defaults
    useEffect(() => {
        const initialValues = {};
        config.fields?.forEach(field => {
            initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
        });
        setFieldValues(initialValues);
    }, [data, config.fields]);

    const handleFieldChange = (fieldName, value) => {
        setFieldValues(prev => ({ ...prev, [fieldName]: value }));
        updateNodeField(id, fieldName, value);

        // Call custom onChange handler if provided
        const field = config.fields?.find(f => f.name === fieldName);
        if (field?.onChange) {
            field.onChange(value, id);
        }
    };

    const renderField = (field) => {
        const value = fieldValues[field.name] || '';

        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'url':
                return (
                    <input
                        type={field.type}
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="node-input"
                        style={field.inputStyle}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="node-textarea"
                        style={field.inputStyle}
                        rows={field.rows || 3}
                    />
                );

            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="node-select"
                        style={field.inputStyle}
                    >
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                        className="node-checkbox"
                        style={field.inputStyle}
                    />
                );

            default:
                return null;
        }
    };

    const defaultStyles = {
        width: config.styles?.width || 200,
        height: config.styles?.height || 'auto',
        minHeight: config.styles?.minHeight || 80,
        border: config.styles?.border || '2px solid #1a192b',
        borderRadius: config.styles?.borderRadius || '8px',
        padding: config.styles?.padding || '10px',
        backgroundColor: config.styles?.backgroundColor || '#fff',
        boxShadow: config.styles?.boxShadow || '0 4px 6px rgba(0,0,0,0.1)',
    };

    return (
        <div style={defaultStyles} className="base-node">
            {/* Input Handles */}
            {config.inputs?.map((input, index) => (
                <Handle
                    key={`input-${index}`}
                    type="target"
                    position={input.position || Position.Left}
                    id={`${id}-${input.id}`}
                    style={{
                        top: input.top || `${((index + 1) * 100) / (config.inputs.length + 1)}%`,
                        ...input.style
                    }}
                    title={input.label}
                />
            ))}

            {/* Node Title */}
            <div style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                fontSize: '14px',
                color: config.styles?.titleColor || '#1a192b',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '5px'
            }}>
                {config.title}
            </div>

            {/* Node Description */}
            {config.description && (
                <div style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginBottom: '8px'
                }}>
                    {config.description}
                </div>
            )}

            {/* Fields */}
            {config.fields?.map((field) => (
                <div key={field.name} style={{ marginBottom: '8px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#374151'
                    }}>
                        {field.label}:
                    </label>
                    {renderField(field)}
                </div>
            ))}

            {/* Output Handles */}
            {config.outputs?.map((output, index) => (
                <Handle
                    key={`output-${index}`}
                    type="source"
                    position={output.position || Position.Right}
                    id={`${id}-${output.id}`}
                    style={{
                        top: output.top || `${((index + 1) * 100) / (config.outputs.length + 1)}%`,
                        ...output.style
                    }}
                    title={output.label}
                />
            ))}
        </div>
    );
};

/**
 * Factory function to create a node component using BaseNode
 */
export const createNode = (config) => {
    return ({ id, data }) => <BaseNode id={id} data={data} config={config} />;
};
