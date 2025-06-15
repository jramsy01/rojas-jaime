// index.js
const fastify = require('fastify')({ logger: true });

// Simulación de base de datos en memoria
let productos = [
  { id: 1, nombre: 'Laptop', precio: 850, categoria: 'Tecnología' },
  { id: 2, nombre: 'Silla Gamer', precio: 250, categoria: 'Hogar' }
];

// GET /productos - Lista todos los productos
fastify.get('/productos', async () => {
  return productos;
});

// GET /productos/:id - Devuelve un producto específico
fastify.get('/productos/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return reply.code(404).send({ error: 'Producto no encontrado' });
  }

  return producto;
});

// POST /productos - Crea un nuevo producto
fastify.post('/productos', async (request, reply) => {
  const { nombre, precio, categoria } = request.body;

  if (!nombre || !precio || !categoria) {
    return reply.code(400).send({ error: 'Faltan campos obligatorios' });
  }

  const nuevo = {
    id: productos.length + 1,
    nombre,
    precio,
    categoria
  };

  productos.push(nuevo);
  return reply.code(201).send(nuevo);
});

// PUT /productos/:id - Actualiza un producto completo
fastify.put('/productos/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return reply.code(404).send({ error: 'Producto no encontrado' });
  }

  const { nombre, precio, categoria } = request.body;

  if (!nombre || !precio || !categoria) {
    return reply.code(400).send({ error: 'Faltan campos obligatorios' });
  }

  productos[index] = { id, nombre, precio, categoria };
  return productos[index];
});

// DELETE /productos/:id - Elimina un producto
fastify.delete('/productos/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const existe = productos.some(p => p.id === id);

  if (!existe) {
    return reply.code(404).send({ error: 'Producto no encontrado' });
  }

  productos = productos.filter(p => p.id !== id);
  return { mensaje: 'Producto eliminado correctamente' };
});

// Iniciar servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Servidor en http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
