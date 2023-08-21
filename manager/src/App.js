import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Account from './Account';
import Seat from './Seat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Account/>}/>
          <Route path='seat' element={<Seat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
