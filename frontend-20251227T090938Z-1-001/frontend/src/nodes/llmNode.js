// llmNode.js
// Refactored using BaseNode abstraction

import { createNode } from './BaseNode';

const llmNodeConfig = {
  title: 'LLM',
  description: 'Large Language Model',
  fields: [
    {
      name: 'modelName',
      label: 'Model',
      type: 'select',
      defaultValue: 'GPT-3.5',
      options: [
        { value: 'GPT-3.5', label: 'GPT-3.5' },
        { value: 'GPT-4', label: 'GPT-4' },
        { value: 'Claude', label: 'Claude' },
        { value: 'Llama', label: 'Llama' }
      ]
    }
  ],
  inputs: [
    {
      id: 'system',
      label: 'System',
      position: 'left',
      top: '33%'
    },
    {
      id: 'prompt',
      label: 'Prompt',
      position: 'left',
      top: '66%'
    }
  ],
  outputs: [
    {
      id: 'response',
      label: 'Response',
      position: 'right'
    }
  ],
  styles: {
    backgroundColor: '#f3e8ff',
    border: '2px solid #a855f7',
    titleColor: '#7c3aed'
  }
};

export const LLMNode = createNode(llmNodeConfig);
