import React,{useEffect,useState} from 'react';
import './../css/ProductosView.css';
import ApiService from '../data/ApiService';
import Constants from '../data/Url';
import { Link } from 'react-router-dom';


const ProductosEnOferta = () => {

    const baseUrl = Constants.API_BASE_URL;
    const service = new ApiService(baseUrl);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
          try {
            const response = await service.getAll('productos_en_oferta');
            setProductos(response);
          } catch (error) {
            console.error('Error al cargar productos:', error);
            console.log(error)
          }
        };
        cargarProductos();
      }, []);



    return (
        <div className="container">

        <div className='titulo'>
        <h1>Productos en oferta</h1>
        </div>
       
        
        <div className="grid-container">
          <div className="grid-header">
            <div>ID</div>
            <div>Nombre</div>
            <div>Precio</div>
          </div>
          {productos && productos.map((producto) => (
            <div key={producto.id} className="grid-row">
              <div>{producto.idProducto}</div>
              <div>{producto.nombre}</div>
              <div>{producto.precio}</div>
            </div>
          ))}
        </div>
        <button className='button-ofertas'><Link to='/' >Volver a productos</Link></button>
      </div>
    )
}

export default ProductosEnOferta;

