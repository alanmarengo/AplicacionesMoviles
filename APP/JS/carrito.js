function GuardarProductoEnLocalStorage(id,precio,imagen,cantidad,nombre){
    var carro =[];
    var producto = {
        id : id,
        precio : precio,
        imagen : imagen,
        cantidad : cantidad,
        nombre : nombre
    }
    
    if(!VerificarExistenciaCarroLocalStorage()){
        carro.push(producto);
        GuardarCarro(JSON.stringify(carro));
    }
    else{
        var carroLocalStorage = ObtenerCarroLocalStorage();
        var existeProducto = false;
        for(const producto of carroLocalStorage){
            if(producto.id==id){
                existeProducto = true;
                producto.cantidad++;
                break;
            }
        }
        if(!existeProducto){
            carroLocalStorage.push(producto); 
        }
        GuardarCarro(JSON.stringify(carroLocalStorage));
    }
}

function GuardarCarro(carro){
    localStorage.setItem('carro', carro);
}

function ObtenerCarroLocalStorage(){
    var carro = JSON.parse(localStorage.getItem('carro'));
    return carro;
}


function VerificarExistenciaCarroLocalStorage(){
    return (JSON.parse(localStorage.getItem('carro')) != null);
}


function BorrarProductoCarroLocalStorage(productoID){
    var contenedorCarrito = $('.carritodesplegable');
    var nuevoCarro = [];
    var carroActual = ObtenerCarroLocalStorage();
    carroActual.forEach((element)=>{
        if(element.id!=productoID){
            nuevoCarro.push(element);
        }}
    );
    GuardarCarro(JSON.stringify(nuevoCarro));
    contenedorCarrito.remove("#"+productoID);
}


function RenderizarCarritoEnContenedor(){
    var productos = ObtenerCarroLocalStorage();
    if(productos!=null){
    var contenedorCarrito = $('.carritodesplegable');
    contenedorCarrito.html("");
    productos.forEach((element)=>{
        var producto = ConstruirHTMLProductoCarrito(element);
        contenedorCarrito.append(producto);
    });
    }
}


function ConstruirHTMLProductoCarrito(producto){
    
 var productoCarro =   `
        <div id="a${producto.id}" class="productocarritodesplegable">
        <img src=${producto.imagen} alt="">
        <div class="datosproductodesplegable">
            <h4>
                ${producto.nombre}
            </h4>
            <h3 id="precio-${producto.id}">
                $${producto.precio*producto.cantidad}
            </h3>
            <div class="contadores">
                <button class="productocarritodesplegableagregar" onclick="RestarCantidad(${producto.id},${producto.precio})" >-</button>
                <h4 id="contador-${producto.id}" class="contadorcantidadproductocarrito">${producto.cantidad}</h4><h4>x</h4>
                <button class="productocarritodesplegableborrar" onclick="SumarCantidad(${producto.id},${producto.precio})">+</button>
            </div>
            
        </div>
        <div class="borrarproductodesplegable">
            <img class="iconobasura" src="IMAGES/ICONS/TachoBasura.png" alt="" onclick="BorrarProductoCarroLocalStorage(${producto.id})"> 
        </div>
        </div>  
`
    return productoCarro;
}



function ModificarCantidadProductoCarroLocalStorage(productoID,cantidad){
    //si la cantidad es < 1 , entonces se aplica el borrado.
    var carro = ObtenerCarroLocalStorage();
    carro.forEach((element)=>{
        if(element.id==productoID){
            element.cantidad=cantidad;
        }   
    });
    GuardarCarro(JSON.stringify(carro));
}

function ObtenerContenedorContador(productoID){
    var contenedorCarrito = $('#contador-'+productoID);
    return contenedorCarrito;
}

function SumarCantidad(productoID,precio){
    var contador = ObtenerContenedorContador(productoID);
    var contadorActualizado = ObtenerValorContadorProducto(productoID);
    var contenedorPrecio = $('#precio-'+productoID);
    contadorActualizado++;
    contador.html(contadorActualizado);
    contenedorPrecio.html("");
    contenedorPrecio.html("$"+precio*contadorActualizado)
    ModificarCantidadProductoCarroLocalStorage(productoID,contadorActualizado);

}

function RestarCantidad(productoID,precio){
    var contador = ObtenerContenedorContador(productoID);
    var contadorActualizado = ObtenerValorContadorProducto(productoID);
    var contenedorPrecio = $('#precio-'+productoID);
    if(contadorActualizado > 1){
        contadorActualizado--;
        contenedorPrecio.html("");
        contenedorPrecio.html("$"+precio*contadorActualizado)
    }
    
    contador.html(contadorActualizado);
    ModificarCantidadProductoCarroLocalStorage(productoID,contadorActualizado);
}

function ObtenerValorContadorProducto(productoID){
    var contador = ObtenerContenedorContador(productoID);
    var valorContador = parseInt(contador.html());
    return valorContador;
}
function BorrarProductoCarroLocalStorage(productoID){
    var contenedorCarrito = document.querySelector('.carritodesplegable').querySelector("#a"+productoID);
    contenedorCarrito.remove();
    var nuevoCarro = [];
    var carroActual = ObtenerCarroLocalStorage();
    carroActual.forEach((element)=>{
        if(element.id!=productoID){
            nuevoCarro.push(element);
        }}
    );
    GuardarCarro(JSON.stringify(nuevoCarro));
}



