import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import {Add} from './components/add'
import {Getdetail} from './components/getData'
import {Edit} from './components/edit'
import {FaceAuth} from './components/faceauthe'
function App(){  
    return (
      <div className="App">
        <Router>
          <Link to='/face'>Face Authentication Camera</Link>
          <Routes>
            <Route path='/' element={<Add />} />
            <Route path='/data' element={<Getdetail />} />
            <Route path='/face' element={<FaceAuth />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </Router>
      </div>
    );  
}

export default App;
