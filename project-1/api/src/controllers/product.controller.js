/**
 * Arquivo: src/controllers/funcionario.controller.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Product'
 * Data: 03/03/2020
 * Author: Glaucia Lemos
 */

const db = require('../config/database');

// ==> Método responsável por criar um novo 'Product':
exports.createProduct = async (req, res) => {
  const { productname, quantity, price } = req.body;
  const response = await db.query(
    'INSERT INTO products (productname, quantity, price) VALUES ($1, $2, $3)',
    [productname, quantity, price],
  );

  res.status(201).send({
    message: 'Product added successfully!',
    body: {
      product: { productname, quantity, price },
    },
  });
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllProducts = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM products ORDER BY productname ASC',
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Id':
exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query(
    'SELECT * FROM products WHERE productid = $1',
    [productId],
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'Product' pelo 'Id':
exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { productname, quantity, price } = req.body;

  const response = await db.query(
    'UPDATE products SET productname = $1, quantity = $2, price = $3 WHERE productId = $4',
    [productname, quantity, price, productId],
  );

  res.status(200).send({ message: 'Product Updated Successfully!' });
};

// ==> Método responsável por excluir um 'Product' pelo 'Id':
exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId,
  ]);

  res.status(200).send({ message: 'Product deleted successfully!', productId });
};
