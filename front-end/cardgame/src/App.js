import './App.css';
import Tutorial from './components/game/Tutorial';
import StartingMenu from './components/game/StartingMenu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartingMenu />} />
          {/* <Route path='/start' element={<StartingMenu />} /> */}
          <Route path='tutorial' element={<Tutorial />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
