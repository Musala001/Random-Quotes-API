import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://thingproxy.freeboard.io/fetch/https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to load quote.');
      setAuthor('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app">
      <h1>Random Quote Generator</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="quote-box">
          <p className="quote">“{quote}”</p>
          <p className="author">— {author}</p>
        </div>
      )}
      <button onClick={fetchQuote}>Get New Quote</button>
    </div>
  );
}

export default App;
