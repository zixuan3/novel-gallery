import React from 'react';
import MainLayout from './MainLayout.js';
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';

function routerStructure() {
  return (
    <Router>
      <div>
	  	  <Routes>
          <Route path='/novel-gallery' element={<MainLayout />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function App() {
    return (
        <div>
	       <div>
	  	        {routerStructure()}
	       </div>
        </div>
    );
}

export default App;
