// mergeNode.js
// Data Merge node - demonstrates node abstraction

import { createNode } from './BaseNode';

const mergeNodeConfig = {
    title: 'Merge',
    description: 'Combine multiple inputs',
    fields: [
        {
            name: 'strategy',
            label: 'Merge Strategy',
            type: 'select',
            defaultValue: 'concat',
            options: [
                { value: 'concat', label: 'Concatenate' },
                { value: 'merge', label: 'Merge Objects' },
                { value: 'zip', label: 'Zip Arrays' },
                { value: 'union', label: 'Union' }
            ]
        },
        {
            name: 'separator',
            label: 'Separator',
            type: 'text',
            defaultValue: ', ',
            placeholder: 'For concat strategy'
        }
    ],
    inputs: [
        {
            id: 'input1',
            label: 'Input 1',
            position: 'left',
            top: '25%'
        },
        {
            id: 'input2',
            label: 'Input 2',
            position: 'left',
            top: '50%'
        },
        {
            id: 'input3',
            label: 'Input 3',
            position: 'left',
            top: '75%'
        }
    ],
    outputs: [
        {
            id: 'output',
            label: 'Merged',
            position: 'right'
        }
    ],
    styles: {
        backgroundColor: '#e0e7ff',
        border: '2px solid #6366f1',
        titleColor: '#4338ca'
    }
};

export const MergeNode = createNode(mergeNodeConfig);
