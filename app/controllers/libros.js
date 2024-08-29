const Libros = require('../../models/libros.js');

const getAll = async (req, res) => {
    try{
        const result = await Libros.findAll();
        res.json(result);
    }catch(error){
        res.status(500).json({error: 'Error al obtener los libros', detalle: error});
    }
}

const addLibro = async (req, res) => {
    const { nombre, autor, categoria, "año-publicacion": añoPublicacion, ISBN} = req.body;

    if (!nombre || !autor || !categoria || !añoPublicacion || !ISBN ){
        return res.status(400).json({error: 'Todos los campos son obligatorios'});
    }
    try {
        const result = await Libros.create({
            nombre,
            autor,
            categoria,
            'año-publicacion': añoPublicacion,
            ISBN
        });
        res.json({ 
            id: result.id,
            nombre, 
            message: 'Libro agregado con éxito' });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el libro", error: error.message });
    }
}

const getLibroId = async (req, res) =>{
    const libroId = req.params.id;
    try {
        const result = await Libros.findByPk(libroId);
        if(!result){
            return res.status(404).json({message: 'Libro no encontrado'});
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el libro', error: error.message});
    }
}

const updateLibro = async(req, res) => {
    const libroId = req.params.id;
    try {
        const libro = await Libros.findByPk(libroId);
        if(!libro){
            console.log('No se encontró ningún libro con el ID especificado');
            return res.status(404).json({message: 'No se encontro el ID especificado'});
        }

        const updateData = {
            nombre: req.body.nombre || libro.nombre,
            autor: req.body.autor || libro.autor,
            categoria: req.body.categoria || libro.categoria,
            'año-publicacion': req.body.añoPublicacion || libro['año-publicacion'],
            ISBN: req.body.ISBN || libro.ISBN,
        };

        const [affectedRows] = await Libros.update(updateData, {
            where: {id: libroId}
        });

        if(affectedRows > 0){
            console.log('Libro actualizado correctamente'); 
            res.json({message: 'Libro actualizado correctamente'});
        }else{
            console.log('No se encontró ningún libro con el ID especificado');
            res.status(404).json({message:'No se encontro el ID del Libro'});
        }

    } catch (error) {
        console.error('Error al actualizar el libro:', error.message);
        res.status(500).json({message:'No se encontro el ID del Libro', error: error.message});
    }
}

const deleteLibro = async(req, res) =>{
    const { ISBN } = req.body;

    if(!ISBN){
        return res.status(400).json({message: 'El ISBN es requerido'});
    }

    try {
        const affectedRows = await Libros.destroy({
            where: {ISBN}
        });
        if(affectedRows > 0){
            console.log('Libro eliminado correctamente');
            res.json({ message: 'Libro eliminado correctamente' });
        }else{
            console.log('No se encontró ningún libro con el ISBN especificado');
            res.status(404).json({ message: 'No se encontró ningún libro con el ISBN especificado' });
        }
    } catch (error) {
        console.error('Error al eliminar el libro:', error.message);
        res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
    }

}



module.exports = { getAll, addLibro, getLibroId, updateLibro, deleteLibro };

