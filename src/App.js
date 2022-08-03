import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Add} from './components/add'
import {Getdetail} from './components/getData'
function App(){  
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Add />} />
            <Route path='/data' element={<Getdetail />} />
            
          </Routes>
        </Router>
      </div>
    );  
}

export default App;
