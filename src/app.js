const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

const productManager = new ProductManager('./productos.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit, 10));
    res.json({ products: limitedProducts });
  } else {
    res.json({ products });
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
