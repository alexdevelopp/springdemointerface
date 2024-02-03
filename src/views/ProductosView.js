import React,{useEffect,useState} from 'react';
import './../css/ProductosView.css';
import ApiService from '../data/ApiService';
import Constants from '../data/Url';



const ProductosView = () => {

  const baseUrl = Constants.API_BASE_URL;
  const service = new ApiService(baseUrl)
  const [productos, setProductos] = useState([]);
  const [nombre,setNombre] = useState([]);
  const [precio,setPrecio] = useState([]);
  
  useEffect(() => {


    const cargarProductos = async () => {
      try {
        const response = await service.getAll('productos'); 
        setProductos(response);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    // Llamada a la API para obtener la lista de productos al montar el componente
    cargarProductos();
  },[]); 

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  }

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  }

  //Evento que añade un producto
  const postProducto = async (event) => {

    event.preventDefault()

    const productoNuevo = {
      nombre: nombre,
      precio: precio
    };

    await service.create('productos',productoNuevo)
    setNombre('')
    setPrecio('')
    setProductos([...productos, productoNuevo]);
  }

  const deleteProducto = async (id) => {
    try {
      await service.delete('productos',id);
      //Actualizar lista de productos sin la eliminada
      console.log(id)
      const updateProductos = productos.filter((producto) => producto.idProducto !== id);
      setProductos(updateProductos);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }

  }

  

  return (
    <div className="container">

      <div className='titulo'>
      <h1>Lista de Productos</h1>
      </div>
     
      
      <div className="grid-container">
        <div className="grid-header">
          <div>ID</div>
          <div>Nombre</div>
          <div>Precio</div>
          <div>Acciones</div>
        </div>
        {productos && productos.map((producto) => (
          <div key={producto.id} className="grid-row">
            <div>{producto.idProducto}</div>
            <div>{producto.nombre}</div>
            <div>{producto.precio}</div>
            <div>
              <button className='button-eliminar button-comun' onClick={() => deleteProducto(producto.idProducto)}>Eliminar</button>
              <button className='button-modificar button-comun'>Modificar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="formulario">
        <div className='titulo'>
        <h2>Agregar Producto</h2>
        </div>
        <label>Nombre: <input type="text" id="nombre" value={nombre} onChange={handleNameChange}/></label>
        <label>Precio: <input type="text" id="precio" value={precio} onChange={handlePrecioChange}/></label>
        <button className='button-comun button-submit' onClick={postProducto}>Añadir</button>
      </div>
    </div>
  );
 


};

export default ProductosView;
