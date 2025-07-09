import Producto from '../models/Producto.js';

export const obtenerProductos = async (req, reply) => {
  const productos = await Producto.find();
  const productosJSON = productos.map(p => ({
    id: p._id,
    nombre: p.nombre,
    precio: p.precio
  }));
  reply.send(productosJSON);
};

export const obtenerProducto = async (req, reply) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    return reply.code(404).send({ error: 'Producto no encontrado' });
  }
  reply.send({
    id: producto._id,
    nombre: producto.nombre,
    precio: producto.precio
  });
};

export const crearProducto = async (req, reply) => {
  const { nombre, precio } = req.body;
  const nuevoProducto = new Producto({ nombre, precio });
  await nuevoProducto.save();
  reply.code(201).send({
    id: nuevoProducto._id,
    nombre: nuevoProducto.nombre,
    precio: nuevoProducto.precio
  });
};

export const actualizarProducto = async (req, reply) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    { nombre, precio },
    { new: true }
  );
  if (!productoActualizado) {
    return reply.code(404).send({ error: 'Producto no encontrado' });
  }
  reply.send({
    id: productoActualizado._id,
    nombre: productoActualizado.nombre,
    precio: productoActualizado.precio
  });
};

export const eliminarProducto = async (req, reply) => {
  const { id } = req.params;
  await Producto.findByIdAndDelete(id);
  reply.code(204).send();
};
