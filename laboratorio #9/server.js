import fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = fastify();
const PORT = process.env.PORT || 3000;

await connectDB();

app.register(productRoutes, { prefix: "/api" });

app.get("/", async (request, reply) => {
  reply.send({ msg: "Servidor funcionando" });
});

app.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor corriendo en ${address}`);
});
