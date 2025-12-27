// outputNode.js
// Refactored using BaseNode abstraction

import { createNode } from './BaseNode';

const outputNodeConfig = {
  title: 'Output',
  description: 'Define an output destination',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      defaultValue: 'output_1',
      placeholder: 'Enter output name'
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' }
      ]
    }
  ],
  inputs: [
    {
      id: 'value',
      label: 'Input',
      position: 'left'
    }
  ],
  styles: {
    backgroundColor: '#fef3c7',
    border: '2px solid #f59e0b',
    titleColor: '#d97706'
  }
};

export const OutputNode = createNode(outputNodeConfig);
