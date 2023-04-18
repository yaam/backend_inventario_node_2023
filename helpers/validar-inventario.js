const validarInventario = (req) =>{
    const validaciones = [];

    if(!req.body.serial){
        validaciones.push('serial es requerido');
    }

    if(!req.body.modelo){
        validaciones.push('modelo es requerido');
    }
    if(!req.body.descripcion){
        validaciones.push('Descripcion es requerido');
    }
    if(!req.body.foto){
        validaciones.push('foto es requerido');
    }
    if(!req.body.fechaCompra){
        validaciones.push('fecha compra es requerido');
    }
    if(!req.body.precio){
        validaciones.push('precio es requerido');
    }
    if(!req.body.usuario){
        validaciones.push('usuario es requerido');
    }
    if(!req.body.marca){
        validaciones.push('marca es requerido');
    }
    if(!req.body.tipoEquipo){
        validaciones.push('Tipo Equipo es requerido');
    }
    if(!req.body.estadoEquipo){
        validaciones.push('Estado Equipo es requerido');
    }

    return validaciones;
}
module.exports = {
    validarInventario,
}