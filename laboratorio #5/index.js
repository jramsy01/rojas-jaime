// index.js
const fastify = require('fastify')({ logger: true });

// Función para generar la serie de Fibonacci
function generarFibonacci(n) {
  const serie = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) serie.push(0);
    else if (i === 1) serie.push(1);
    else serie.push(serie[i - 1] + serie[i - 2]);
  }
  return serie;
}

// Ruta GET /fibonacci/:n
fastify.get('/fibonacci/:n', (request, reply) => {
  const n = parseInt(request.params.n, 10);

 
  if (isNaN(n) || n < 0) {
    return reply.status(400).send({ error: 'Parámetro inválido. Debe ser un número entero positivo.' });
  }

  const resultado = generarFibonacci(n);
  return reply.send(resultado);
});

// Iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Servidor corriendo en http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
