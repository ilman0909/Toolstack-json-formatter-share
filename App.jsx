import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setOutput('Invalid JSON');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Toolstack JSON Formatter</h1>
      <textarea rows="10" cols="50" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your JSON here" />
      <br />
      <button onClick={formatJson}>Format</button>
      <pre>{output}</pre>
    </div>
  );
};

export default App;