// backend/server.js
const fastify = require('fastify')({ logger: true })
fastify.register(require('@fastify/cors')) // permite peticiones desde el navegador

let productos = [
  { id: 1, nombre: 'Laptop', precio: 950 },
  { id: 2, nombre: 'Mouse', precio: 25 }
]

// Rutas

// Obtener todos los productos
fastify.get('/productos', async (request, reply) => {
  return productos
})

// Obtener un producto por ID
fastify.get('/productos/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const producto = productos.find(p => p.id === id)
  if (!producto) return reply.status(404).send({ mensaje: 'Producto no encontrado' })
  return producto
})

// Crear producto
fastify.post('/productos', async (request, reply) => {
  const nuevo = request.body
  nuevo.id = productos.length ? productos[productos.length - 1].id + 1 : 1
  productos.push(nuevo)
  return { mensaje: 'Producto creado', producto: nuevo }
})

// Editar producto
fastify.put('/productos/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const index = productos.findIndex(p => p.id === id)
  if (index === -1) return reply.status(404).send({ mensaje: 'Producto no encontrado' })

  productos[index] = { id, ...request.body }
  return { mensaje: 'Producto actualizado', producto: productos[index] }
})

// Eliminar producto
fastify.delete('/productos/:id', async (request, reply) => {
  const id = Number(request.params.id)
  productos = productos.filter(p => p.id !== id)
  return { mensaje: 'Producto eliminado' }
})

// Iniciar servidor
fastify.listen({ port: 3000 }, err => {
  if (err) throw err
})
