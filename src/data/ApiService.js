import axios from 'axios';

class ApiService {
    constructor(baseURL) {
      this.api = axios.create({
        baseURL: baseURL,
      });
    }

     // Obtener todos los elementos
  async getAll(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  // Obtener un elemento por su ID
  async getById(endpoint, id) {
    try {
      const response = await this.api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos por ID:', error);
      throw error;
    }
  }

  // Crear un nuevo elemento
  async create(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error al crear elemento:', error);
      throw error;
    }
  }

  // Actualizar un elemento por su ID
  async update(endpoint, id, data) {
    try {
      const response = await this.api.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error)
      console.error('Error al actualizar elemento:', error);
      throw error;
    }
  }

  // Eliminar un elemento por su ID
  async delete(endpoint, id) {
    try {
      const response = await this.api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar elemento:', error);
      throw error;
    }
  }
}
 export default ApiService;
