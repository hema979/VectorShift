// inputNode.js
// Refactored using BaseNode abstraction

import { createNode } from './BaseNode';

const inputNodeConfig = {
  title: 'Input',
  description: 'Define an input source',
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      defaultValue: 'input_1',
      placeholder: 'Enter input name'
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ],
  outputs: [
    {
      id: 'value',
      label: 'Output',
      position: 'right'
    }
  ],
  styles: {
    backgroundColor: '#f0f9ff',
    border: '2px solid #0ea5e9',
    titleColor: '#0369a1'
  }
};

export const InputNode = createNode(inputNodeConfig);
