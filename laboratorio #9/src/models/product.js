import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
});

export default mongoose.model("Producto", productSchema);
