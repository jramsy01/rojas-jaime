import Product from '../model/product.js'

export const getAllProducts = async (request, reply) => {
  try {
    const products = await Product.find()
    reply.send(products)
  } catch (error) {
    reply.status(500).send({ error: 'Error fetching products' })
  }
}

export const getProductById = async (request, reply) => {
  try {
    const product = await Product.findById(request.params.id)
    if (!product) {
      return reply.status(404).send({ error: 'Product not found' })
    }
    reply.send(product)
  } catch (error) {
    reply.status(500).send({ error: 'Error fetching product' })
  }
}

export const createProduct = async (request, reply) => {
  try {
    const product = new Product(request.body)
    await product.save()
    reply.status(201).send(product)
  } catch (error) {
    reply.status(500).send({ error: 'Error creating product' })
  }
}

export const updateProduct = async (request, reply) => {
  try {
    const product = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true })
    if (!product) {
      return reply.status(404).send({ error: 'Product not found' })
    }
    reply.send(product)
  } catch (error) {
    reply.status(500).send({ error: 'Error updating product' })
  }
}

export const deleteProduct = async (request, reply) => {
  try {
    const product = await Product.findByIdAndDelete(request.params.id)
    if (!product) {
      return reply.status(404).send({ error: 'Product not found' })
    }
    reply.send({ message: 'Product deleted' })
  } catch (error) {
    reply.status(500).send({ error: 'Error deleting product' })
  }
}
