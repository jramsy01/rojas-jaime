import Producto from "../models/product.js";
import Stripe from "stripe";
import { getProducts } from "../controller/productController.js";

export default async function (fastify, opts) {
  fastify.get("/productos", getProducts);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function productRoutes(fastify, options) {
  // Obtener todos los productos
  fastify.get("/", async (request, reply) => {
    try {
      const productos = await Producto.find();
      reply.send(productos);
    } catch (error) {
      reply.status(500).send({ error: "Error al obtener productos" });
    }
  });

  // Comprar un producto
  fastify.post("/:id/comprar", async (request, reply) => {
    try {
      const { id } = request.params;
      const producto = await Producto.findById(id);

      if (!producto) {
        return reply.status(404).send({ error: "Producto no encontrado" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: producto.nombre,
              },
              unit_amount: producto.precio * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success.html",
        cancel_url: "http://localhost:3000/cancel.html",
      });

      reply.send({ url: session.url });
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });
}
