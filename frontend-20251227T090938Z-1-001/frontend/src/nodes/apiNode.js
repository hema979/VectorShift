// apiNode.js
// API Request node - demonstrates node abstraction

import { createNode } from './BaseNode';

const apiNodeConfig = {
    title: 'API Request',
    description: 'Make HTTP API calls',
    fields: [
        {
            name: 'url',
            label: 'URL',
            type: 'url',
            defaultValue: 'https://api.example.com',
            placeholder: 'Enter API endpoint'
        },
        {
            name: 'method',
            label: 'Method',
            type: 'select',
            defaultValue: 'GET',
            options: [
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' }
            ]
        },
        {
            name: 'headers',
            label: 'Headers',
            type: 'textarea',
            defaultValue: '{}',
            placeholder: 'JSON headers',
            rows: 2
        }
    ],
    inputs: [
        {
            id: 'body',
            label: 'Request Body',
            position: 'left'
        }
    ],
    outputs: [
        {
            id: 'response',
            label: 'Response',
            position: 'right',
            top: '33%'
        },
        {
            id: 'status',
            label: 'Status',
            position: 'right',
            top: '66%'
        }
    ],
    styles: {
        backgroundColor: '#dbeafe',
        border: '2px solid #3b82f6',
        titleColor: '#1e40af',
        minHeight: 180
    }
};

export const APINode = createNode(apiNodeConfig);
