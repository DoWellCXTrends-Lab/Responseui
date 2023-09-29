// App.js

import React from 'react';
import './App.css';
// import './Content.css';
import './Sidebar.css';
import Sidebar from './Sidebar';
// import Content from './Content';

function App() {
  return (
    <div className="app">
      <Sidebar />
      {/* <Content /> */}
      {/* Main content goes here */}
    </div>
  );
}

export default App;
