const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoController');

// Rutas para manejar operaciones CRUD de productos

// POST /api/producto - Crear un nuevo producto
router.post('/', productoController.crearProducto);

// GET /api/producto - Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// PUT /api/producto/:id - Actualizar un producto existente por ID
router.put('/:id', productoController.actualizarProducto);

// GET /api/producto/:id - Obtener un producto por su ID
router.get('/:id', productoController.obtenerProducto);

// DELETE /api/producto/:id - Eliminar un producto por su ID
router.delete('/:id', productoController.eliminarProducto);

// GET /api/producto/incrementar-contador - Incrementar el contador de productos
router.get('/incrementar-contador', productoController.incrementarContador);

module.exports = router;
