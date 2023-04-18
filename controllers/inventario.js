const {Router} = require('express');
const Inventario = require('../modelos/Inventario');
const {validarInventario} = require('../helpers/validar-inventario');

/**
 * Listar todos
 */
    const getInventario =  async (req, res) =>{
    // req.param.id
    // req.body
    // console.log(req,params);
    try {
        const inventarios = await Inventario.find().populate([
        {
            path: 'usuario', select: 'nombre email estado'
        },
        {
            path: 'marca', select: 'nombre estado'
        },
        {
            path: 'tipoEquipo', select : 'nombre estado'
        },
        {
            path: 'estadoEquipo', select : 'nombre estado'
        }    
        ]);
        res.send(inventarios);
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
};

/**
* Creación
 */

const createInventario = async (req, res) =>{
    //console.log(req,body);
    try{
        const validaciones = validarInventario(req);

        if(validaciones.length >0){
            return res.status(400).send(validaciones);
        }
        
        
            let inventario = await Inventario.findOne({serial: req.body.serial});
            if(inventario){
                return res.status(400).send('El serial ya existe');
            }
            const fechaActual = new Date();

            inventario = new Inventario();
            inventario.serial = req.body.serial;
            inventario.modelo = req.body.modelo;
            inventario.descripcion = req.body.descripcion;
            inventario.foto = req.body.foto;
            inventario.color = req.body.color;
            inventario.precio = req.body.precio;
            inventario.usuario = req.body.usuario._id;
            inventario.tipoEquipo = req.body.tipoEquipo._id;
            inventario.estadoEquipo = req.body.estadoEquipo._id;
            inventario.marca = req.body.marca._id;
            inventario.fechaCompra = req.body.fechaCompra;
            inventario.fechaCreacion =new Date();
            inventario.fechaActualizacion = new Date();
            inventario = await inventario.save();
            res.status(201).send(inventario); 

    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }

};



/**
 * Edición
 */
 
const updateInventario = async (req, res)=>{
    try{
        let inventario = await Inventario.findById(req.params.inventarioId);
        // si no existe inventario no actualizo
        if(!inventario){
                return res.status(404).send('No existe el inventario');
            }
            
            //Buscame por serial pero distinto al inventario que estoy actualizando
            const inventarioExisteSerial = await Inventario
             .findOne({serial: req.body.serial, _id: {$ne: inventario._id}});
            if(inventarioExisteSerial){
                return res.status(400).send('El serial ya existe');
            }
            const fechaActual = new Date();

            
            inventario.serial = req.body.serial;
            inventario.modelo = req.body.modelo;
            inventario.descripcion = req.body.descripcion;
            inventario.foto = req.body.foto;
            inventario.color = req.body.color;
            inventario.precio = req.body.precio;
            inventario.usuario = req.body.usuario._id;
            inventario.tipoEquipo = req.body.tipoEquipo._id;
            inventario.estadoEquipo = req.body.estadoEquipo._id;
            inventario.marca = req.body.marca._id;
            inventario.fechaCompra = req.body.fechaCompra;
            //Datos transacionales
            inventario.fechaActualizacion = new Date();
            inventario = await inventario.save();
            res.send(inventario); 

    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
};

const getInventarioId = async (req, res) => {
    try {
        const inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario){
            return res.status(404).send('inventario no definido ')
        }
        res.send(inventario);       
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
}

module.exports = {getInventario, createInventario, updateInventario, getInventarioId}