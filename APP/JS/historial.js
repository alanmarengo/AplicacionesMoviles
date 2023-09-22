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


function RenderizarProductosHistorial(){
    let contenedorProductosHistorial = $(".historialDesplegable");
    contenedorProductosHistorial.html("");
    let productosHistorial = ObtenerHistorialLocalStorage();
    productosHistorial.forEach((element)=>{
        let productoHistorial = ConstruirHtmlProductoHistorial(element);
        contenedorProductosHistorial.append(productoHistorial);
    });
}

function ConstruirHtmlProductoHistorial(producto){
    var producto = `
        <div id="a${producto.id}" class="ItemHistorial">
        <img class="historyImage" src=${producto.imagen} alt="">
        <div class="itemCarritoData">
            <h4>
            ${producto.nombre}
            </h4>
        </div>
        <div class="borrarCarrito">
        <img class="trashIcon" src="http://127.0.0.1:5500/APP/IMAGES/ICONS/TachoBasura.png" alt="">
        </div>
        </div> 
    `;
    return producto;
}
