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
            if(verificarExistenciaDeProducto(id,carroLocalStorage)){
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

function verificarExistenciaDeProducto(productoID, productos){
    var existencia = false;
    productos.forEach((element)=>{
        if(element.id==productoID)
        {
            existencia=true;
        }
    });
    return existencia;
}


function VerificarExistenciaCarroLocalStorage(){
    return (JSON.parse(localStorage.getItem('carro')) != null);
}


function ModificarCantidadProductoCarroLocalStorage(productoID,cantidad){
    var carro = ObtenerCarroLocalStorage();
    carro.forEach((element)=>{
        if(element.id==productoID){
            element.cantidad=cantidad;
        }   
    });
}

function BorrarProductoCarroLocalStorage(productoID){
    var nuevoCarro = [];
    var carroActual = ObtenerCarroLocalStorage();
    carroActual.forEach((element)=>{
        if(element.id!=productoID){
            nuevoCarro.push(element);
        }}
    );
    GuardarCarro(JSON.stringify(nuevoCarro));
}




