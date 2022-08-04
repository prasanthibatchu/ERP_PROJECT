import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import {Add} from './components/add'
import {Getdetail} from './components/getData'
import {Edit} from './components/edit'
function App(){  
    return (
      <div className="App">
        <Router>
          
          <Routes>
            <Route path='/' element={<Add />} />
            <Route path='/data' element={<Getdetail />} />
            
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </Router>
      </div>
    );  
}

export default App;
