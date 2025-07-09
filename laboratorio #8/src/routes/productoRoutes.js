import {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
  } from '../controllers/productoController.js';
  
  export default async function productoRoutes(fastify, options) {
    fastify.get('/productos', obtenerProductos);
    fastify.get('/productos/:id', obtenerProducto);
    fastify.post('/productos', crearProducto);
    fastify.put('/productos/:id', actualizarProducto);
    fastify.delete('/productos/:id', eliminarProducto);
  }
  