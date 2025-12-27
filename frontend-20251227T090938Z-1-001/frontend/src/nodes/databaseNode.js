// databaseNode.js
// Database Query node - demonstrates node abstraction

import { createNode } from './BaseNode';

const databaseNodeConfig = {
    title: 'Database',
    description: 'Execute database queries',
    fields: [
        {
            name: 'dbType',
            label: 'Database Type',
            type: 'select',
            defaultValue: 'PostgreSQL',
            options: [
                { value: 'PostgreSQL', label: 'PostgreSQL' },
                { value: 'MySQL', label: 'MySQL' },
                { value: 'MongoDB', label: 'MongoDB' },
                { value: 'Redis', label: 'Redis' }
            ]
        },
        {
            name: 'connectionString',
            label: 'Connection',
            type: 'text',
            defaultValue: 'localhost:5432',
            placeholder: 'host:port'
        },
        {
            name: 'query',
            label: 'Query',
            type: 'textarea',
            defaultValue: 'SELECT * FROM users',
            placeholder: 'Enter SQL query',
            rows: 3
        }
    ],
    inputs: [
        {
            id: 'params',
            label: 'Parameters',
            position: 'left'
        }
    ],
    outputs: [
        {
            id: 'result',
            label: 'Result',
            position: 'right'
        }
    ],
    styles: {
        backgroundColor: '#fae8ff',
        border: '2px solid #d946ef',
        titleColor: '#a21caf',
        minHeight: 200
    }
};

export const DatabaseNode = createNode(databaseNodeConfig);
