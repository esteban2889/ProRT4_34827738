const express = require('express');
const { getAll, addLibro, getLibroId, updateLibro, deleteLibro } = require('../app/controllers/libros');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getLibroId);
router.post('/add', addLibro);
router.put('/update/:id', updateLibro);
router.delete('/delete', deleteLibro);


module.exports = router;