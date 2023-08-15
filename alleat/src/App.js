import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoreList from './Store';
import Seat from './Seat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StoreList/>}/>
          <Route path='seat' element={<Seat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
