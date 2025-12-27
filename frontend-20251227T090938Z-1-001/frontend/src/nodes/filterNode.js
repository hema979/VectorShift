// filterNode.js
// Data Filter node - demonstrates node abstraction

import { createNode } from './BaseNode';

const filterNodeConfig = {
    title: 'Filter',
    description: 'Filter data based on conditions',
    fields: [
        {
            name: 'condition',
            label: 'Condition',
            type: 'select',
            defaultValue: 'equals',
            options: [
                { value: 'equals', label: 'Equals' },
                { value: 'notEquals', label: 'Not Equals' },
                { value: 'contains', label: 'Contains' },
                { value: 'greaterThan', label: 'Greater Than' },
                { value: 'lessThan', label: 'Less Than' }
            ]
        },
        {
            name: 'value',
            label: 'Value',
            type: 'text',
            defaultValue: '',
            placeholder: 'Comparison value'
        }
    ],
    inputs: [
        {
            id: 'input',
            label: 'Data',
            position: 'left'
        }
    ],
    outputs: [
        {
            id: 'match',
            label: 'Match',
            position: 'right',
            top: '40%'
        },
        {
            id: 'nomatch',
            label: 'No Match',
            position: 'right',
            top: '70%'
        }
    ],
    styles: {
        backgroundColor: '#fed7aa',
        border: '2px solid #ea580c',
        titleColor: '#9a3412'
    }
};

export const FilterNode = createNode(filterNodeConfig);
