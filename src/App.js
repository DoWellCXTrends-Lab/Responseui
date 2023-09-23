// App.js

import React from 'react';
import './App.css';
import './Content.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="app">
      <Sidebar />
      {/* Main content goes here */}
    </div>
  );
}

export default App;
