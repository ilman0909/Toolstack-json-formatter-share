import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Cek apakah ada ?data= di URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("data");
    if (encoded) {
      try {
        const json = JSON.stringify(JSON.parse(decodeURIComponent(encoded)), null, 2);
        setInput(json);
        setOutput(json);
      } catch (e) {
        setOutput("Invalid shared data.");
      }
    }
  }, []);

  // Fungsi untuk memformat JSON
  const handleFormat = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(input), null, 2);
      setOutput(formatted);
    } catch (e) {
      setOutput("❌ JSON tidak valid!");
    }
  };

  // Fungsi untuk generate shareable link
  const handleShare = () => {
    try {
      const encoded = encodeURIComponent(JSON.stringify(JSON.parse(input)));
      const url = `${window.location.origin}?data=${encoded}`;
      navigator.clipboard.writeText(url);
      alert("Link berhasil disalin ke clipboard!");
    } catch (e) {
      alert("Gagal membuat link, pastikan JSON valid.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Toolstack JSON Formatter</h1>
      <textarea
        placeholder="Tempel JSON di sini..."
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", fontFamily: "monospace", marginBottom: "1rem" }}
      />
      <div>
        <button onClick={handleFormat}>Format</button>
        <button onClick={handleShare} style={{ marginLeft: "1rem" }}>
          Bagikan Link
        </button>
      </div>
      <h3>Hasil:</h3>
      <pre
        style={{
          background: "#f0f0f0",
          padding: "1rem",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {output}
      </pre>
    </div>
  );
}

export default App;
