import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductosView from './views/ProductosView'
import ProductosEnOferta from './views/ProductosEnOferta'



function App() {

  useEffect(() => {
    document.title = 'Productos'; 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductosView/>}></Route>
        <Route path="/rebajas" element={<ProductosEnOferta/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
