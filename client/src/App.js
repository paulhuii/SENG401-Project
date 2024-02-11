// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [apiResponse, setApiResponse] = useState('');

//   useEffect(() => {
//       fetch('/api')
//           .then(response => {
//               if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
//                   return response.json();
//               }
//               throw new Error('Response not in JSON format');
//           })
//           .then(data => setApiResponse(data.message))
//           .catch(error => console.error('Failed to fetch data:', error));
//   }, []);


//   return (
//       <div className="App">
//         <header className="App-header">
//           <p>API Response: {apiResponse}</p>
//         </header>
//       </div>
//   );
// }

// export default App;



import React from 'react';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header for the entire application */}
        <header className="App-header">
          <p>JobHub</p>
          <nav>
            <Link to="/">Home</Link>{' '} {/* Update the Link to point to "/" */}
            <Link to="/signup">Signup</Link>
          </nav>
        </header>
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Set the root route to the Home component */}
          <Route path="/home" element={<Home />} /> {/* This is optional, you can remove this line if not needed */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
