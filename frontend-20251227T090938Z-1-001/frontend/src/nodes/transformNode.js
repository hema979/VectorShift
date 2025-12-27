// transformNode.js
// Data Transform node - demonstrates node abstraction

import { createNode } from './BaseNode';

const transformNodeConfig = {
    title: 'Transform',
    description: 'Transform data',
    fields: [
        {
            name: 'operation',
            label: 'Operation',
            type: 'select',
            defaultValue: 'map',
            options: [
                { value: 'map', label: 'Map' },
                { value: 'filter', label: 'Filter' },
                { value: 'reduce', label: 'Reduce' },
                { value: 'sort', label: 'Sort' }
            ]
        },
        {
            name: 'expression',
            label: 'Expression',
            type: 'textarea',
            defaultValue: 'x => x * 2',
            placeholder: 'Enter transformation logic',
            rows: 2
        }
    ],
    inputs: [
        {
            id: 'input',
            label: 'Data In',
            position: 'left'
        }
    ],
    outputs: [
        {
            id: 'output',
            label: 'Data Out',
            position: 'right'
        }
    ],
    styles: {
        backgroundColor: '#fef3c7',
        border: '2px solid #f59e0b',
        titleColor: '#b45309'
    }
};

export const TransformNode = createNode(transformNodeConfig);
