// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Color scheme for different node types
  const nodeColors = {
    customInput: { bg: '#0ea5e9', hover: '#0284c7' },
    customOutput: { bg: '#f59e0b', hover: '#d97706' },
    llm: { bg: '#a855f7', hover: '#9333ea' },
    text: { bg: '#10b981', hover: '#059669' },
    api: { bg: '#3b82f6', hover: '#2563eb' },
    database: { bg: '#d946ef', hover: '#c026d3' },
    transform: { bg: '#f59e0b', hover: '#d97706' },
    filter: { bg: '#ea580c', hover: '#c2410c' },
    merge: { bg: '#6366f1', hover: '#4f46e5' }
  };

  const colors = nodeColors[type] || { bg: '#6b7280', hover: '#4b5563' };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '90px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: colors.bg,
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease',
        border: '2px solid transparent'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = colors.hover;
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = colors.bg;
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }}
      draggable
    >
      <span style={{
        color: '#fff',
        fontWeight: '600',
        fontSize: '13px',
        textAlign: 'center'
      }}>{label}</span>
    </div>
  );
};
