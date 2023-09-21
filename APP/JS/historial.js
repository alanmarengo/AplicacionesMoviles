function BorrarProductoHistorialLocalStorage(productoID){
    var contenedorHistorial = $('.historialDesplegable');
    var nuevoHistorial = [];
    var historialActual = ObtenerHistorialLocalStorage();
    historialActual.forEach((element)=>{
        if(element.id!=productoID){
            nuevoHistorial.push(element);
        }}
    );
    GuardarHistorial(JSON.stringify(nuevoHistorial));
    //contenedorCarrito.remove("#"+productoID);
    //aqui falta todavia HTML Y CSS PARA PODER TERMINAR ESTA PARTE
}

function VerificarExistenciaHistorialLocalStorage(){
    return (JSON.parse(localStorage.getItem('historial')) != null);
}


function GuardarHistorial(historial){
    localStorage.setItem('historial', historial);
}

function ObtenerHistorialLocalStorage(){
    var historial = JSON.parse(localStorage.getItem('historial'));
    return historial;
}


function ValidarExistenciaProductoHistorial(productoId,historial){
    var existeProducto = false;
    for(const producto of historial){
        if(producto.id==productoId){
            existeProducto = true;
            break;
        }
    }
    return existeProducto;
}

