import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    if (encodedData) {
      try {
        const decoded = decodeURIComponent(atob(encodedData));
        setJsonInput(decoded);
      } catch (e) {
        console.error('Invalid data parameter');
      }
    }
  }, []);

  const handleShare = () => {
    try {
      const encoded = btoa(encodeURIComponent(jsonInput));
      const shareLink = `${window.location.origin}?data=${encoded}`;
      setShareUrl(shareLink);
    } catch (e) {
      alert('Failed to encode JSON');
    }
  };

  return (
    <div className="container">
      <h1>Toolstack JSON Formatter</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Masukkan JSON di sini"
      />
      <button onClick={handleShare}>Bagikan Link</button>
      {shareUrl && (
        <div>
          <p>Link:</p>
          <a href={shareUrl} target="_blank" rel="noopener noreferrer">
            {shareUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
