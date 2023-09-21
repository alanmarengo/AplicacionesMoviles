function GuardarProductoEnLocalStorage(id,precio,imagen,cantidad){
    var carro =[];
    var producto = {
        id : id,
        precio : precio,
        imagen : imagen,
        cantidad : cantidad
    }
    
    if(!VerificarExistenciaCarroLocalStorage()){
        carro.push(producto);
        GuardarCarro(JSON.stringify(carro));
    }
    else{
        var carroLocalStorage = ObtenerCarroLocalStorage();
        carroLocalStorage.forEach((element)=>{
            if(element.id==id){
                element.cantidad++;
            }else{
                carroLocalStorage.push(producto);
            }
        });
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
    var contenedorCarrito = $('.CarritoDesplegable');
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
    var contenedorCarrito = $('.CarritoDesplegable');
    contenedorCarrito.html("");
    productos.forEach((element)=>{
        var producto = ConstruirHTMLProductoCarrito(element);
        contenedorCarrito.append(producto);
    });
    }
}


function ConstruirHTMLProductoCarrito(producto){
 var productoCarro =   `
        <div id="${producto.id}" class="ItemCarrito">
        <img src=${producto.imagen} alt="">
        <div class="itemCarritoData">
            <h4>
                ${producto.nombre}
            </h4>
            <h3>
                ${producto.precio}
            </h3>
            <div class="contadores">
                <button class="ItemCarritoButtonAdd" onlick="RestarCantidad(${producto.id})" >-</button>
                <h4 id="contador" class="contadorCarrito">${producto.cantidad}</h4><h4>x</h4>
                <button class="ItemCarritoButtonDelete" onclick="SumarCantidad(${producto.id})">+</button>
            </div>
            
        </div>
        <div class="borrarCarrito">
            <img class="trashIcon" src="../APP/IMAGES/ICONS/TachoBasura.png" alt="" onclick="BorrarProductoCarroLocalStorage(${producto.id})"> 
        </div>
        </div>  
`
    return productoCarro;
}



function ModificarCantidadProductoCarroLocalStorage(productoID,cantidad){
    var carro = ObtenerCarroLocalStorage();
    carro.forEach((element)=>{
        if(element.id==productoID){
            element.cantidad=cantidad;
        }   
    });
}


function SumarCantidad(productoID){
    var contadorActualizado = ObtenerValorContadorProducto();
    contadorActualizado++;
    contador.html(contadorActualizado);
    ModificarCantidadProductoCarroLocalStorage(productoID,contadorActualizado);
}

function RestarCantidad(productoID){
    var contadorActualizado = ObtenerValorContadorProducto();
    contadorActualizado--;
    contador.html(contadorActualizado);
    ModificarCantidadProductoCarroLocalStorage(productoID,valorContador);
}

function ObtenerValorContadorProducto(){
    var contenedorCarrito = $('.CarritoDesplegable');
    var contador = contenedorCarrito.find(".contadorCarrito").html();
    var valorContador = parseInt(contador);
    return valorContador;
}



