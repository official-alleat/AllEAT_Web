import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoreList from './Store';
import Seat from './Seat';
import Menu from './Menu';
import Cart from './Cart';
import Pay from './Pay';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StoreList/>}/>
          <Route path='seat' element={<Seat/>}/>
          <Route path='menu' element={<Menu/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='pay' element={<Pay/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
