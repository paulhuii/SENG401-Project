import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
      fetch('/api')
          .then(response => {
              if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
                  return response.json();
              }
              throw new Error('Response not in JSON format');
          })
          .then(data => setApiResponse(data.message))
          .catch(error => console.error('Failed to fetch data:', error));
  }, []);


  return (
      <div className="App">
        <header className="App-header">
          <p>API Response: {apiResponse}</p>
        </header>
      </div>
  );
}

export default App;
