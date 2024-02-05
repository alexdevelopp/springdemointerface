import React,{useEffect,useState} from 'react';
import './../css/ProductosView.css';
import ApiService from '../data/ApiService';
import Constants from '../data/Url';
import { Link } from 'react-router-dom';



const ProductosView = () => {

  const baseUrl = Constants.API_BASE_URL;
  const service = new ApiService(baseUrl);
  const [productos, setProductos] = useState([]);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  //Carga lista de productos

  useEffect(() => {
    setIsEdit(false);
    setId(null);
    const cargarProductos = async () => {
      try {
        const response = await service.getAll('productos');
        setProductos(response);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    cargarProductos();
  }, []);

//Evento que captura el cambio de nombre

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };

//Evento que captura el cambio de precio
  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  //Obtener los datos de un producto del grid cuando le das a Modificar

  const handleEdit = (id) => {
    const producto = productos.find((producto) => producto.idProducto === id);
    setIsEdit(true);
    setId(id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

//Vaciar y setear campos a null

  const handleCancel = () => {
    setNombre('');
    setPrecio('');
    setIsEdit(false);
    setId(null);
  };

  //Evento que añade o modifica producto

  const handleSubmit = async () => {

    const productoNuevo = {
      nombre: nombre,
      precio: precio,
    };

    if (isEdit) {
      await service.update('productos', id, productoNuevo);
      const updateProductos = productos.map((producto) =>
        producto.idProducto === id
          ? { ...producto, nombre: productoNuevo.nombre, precio: productoNuevo.precio }
          : producto
      );
      setProductos(updateProductos);
      setNombre('');
      setPrecio('');
      setIsEdit(false);
      setId(null);
    } else {
      await service.create('productos', productoNuevo);
      setNombre('');
      setPrecio('');
      setProductos([...productos, productoNuevo]);
    }
  };

//Evento que borra producto

  const deleteProducto = async (id) => {
    try {
      await service.delete('productos', id);
      const updateProductos = productos.filter((producto) => producto.idProducto !== id);
      setProductos(updateProductos);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  

  

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
              <button className='button-modificar button-comun'onClick={() => handleEdit(producto.idProducto)}>Modificar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="formulario">
        <div className='titulo-form'>
        <h2>Agregar Producto</h2>
        </div>
        <label>Nombre: <input type="text" id="nombre" value={nombre} onChange={handleNameChange}/></label>
        <label>Precio: <input type="text" id="precio" value={precio} onChange={handlePrecioChange}/></label>
        <button className='button-comun button-submit' onClick={() => handleSubmit(id)}>{isEdit ? 'Actualizar' : 'Enviar'}</button>
        <button className='button-comun button-eliminar' onClick={handleCancel}>Cancelar</button>
      </div>
      <div className='ofertas-container'>
        <h3>Tenemos varios productos rebajados al 20%.</h3>
        <button className='button-ofertas'><Link to='/rebajas'>Ver los productos en oferta</Link></button>
      </div>
    </div>
  );
 


};

export default ProductosView;
