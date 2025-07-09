import fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import productoRoutes from './src/routes/productoRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: true });

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
}).catch(err => {
  console.error(err);
  process.exit(1);
});

// Sirve archivos estáticos
app.register(fastifyStatic, {
  root: path.join(__dirname),
});

// Rutas API
app.register(productoRoutes);

app.listen({ port: process.env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor corriendo en ${address}`);
});
