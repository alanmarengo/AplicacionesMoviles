$(function() {
    RenderizarContenidoProducto();
});


function ObtenerIdProducto(){
    const parametros = new URL(location.href).searchParams;
    const productoId = parametros.get('productoId');
    return productoId;
}


async function  ObtenerPathProduct(){
    var JSONCONFIG = $.getJSON("../CONFIG/config.json");
    var BodyJson = await JSONCONFIG;
    return BodyJson.PathProductBase;
}

function ConstruirHtmlProducto(element){
    var product = 
    `
    <div class="productoDetails" id=${element.productId}>
    <h2>${element.name}</h2>
    <div class="productImageDetail">
        <img class="productImage" src=${element.images.images[0].url} alt="">
        <h3>Oferta!</h3>
    </div>
    <div class="detailsContainer">
        <div class="details">
            <h1 class="Price">$${element.price}</h1>
            <br>
            <button class="btnComprar">COMPRAR</button>
            <button class="btnAdd" onclick="GuardarProductoEnLocalStorage('${element.productId}','${element.price}','${element.images.images[0].url}','${1}','${element.name}' )" >AGREGAR AL CARRITO</button>
        </div>

        <div class="Description">
            <h4>
            ${element.publication.descripcion}
            </h4>
        </div>
        
        <div class="datosUtiles">
            <div class="datosUtiles-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/StockAlto.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="greenCaption">Stock alto en la web</h3>
                    <h3 class="GrayCaption">Solo para venta web </h3>
                </div>
            </div>
            <div class="datosUtiles-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/SinStock.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="redCaption">SIN STOCK EN EL LOCAL</h3>
                    <h3 class="GrayCaption">Solo para venta presencial</h3>
                </div>
            </div>

            <div class="datosUtiles-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/MaximusStore.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="GrayCaption">RETIRO <span style="color: #28FF0D">GRATIS!</span></h3>
                    <h3 class="GrayCaption">En la UNAJ! (Florencio varela)</h3>
                </div>
            </div>
            <div class="datosUtiles-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/CamionEnvios.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="GrayCaption">Envios a todo el pais</span></h3>
                    <h3 class="GrayCaption">En la UNAJ! (Florencio varela)</h3>
                </div>
            </div>
            <div class="contactContainer">
                <img class="contacItem" src="http://127.0.0.1:5500/APP/IMAGES/ICONS/MEDIA ICONS/f.png" alt="">
                <img class="contacItem" src="http://127.0.0.1:5500/APP/IMAGES/ICONS/MEDIA ICONS/i.png" alt="">
                <img class="contacItem" src="http://127.0.0.1:5500/APP/IMAGES/ICONS/MEDIA ICONS/w.png" alt="">
                <img id="abrirModal" class="contacItem" src="http://127.0.0.1:5500/APP/IMAGES/ICONS/MEDIA ICONS/s.png" alt="" onclick="AbrirFormularioCompartir()">
            </div>
            
        </div>
    </div>
    
    
</div>
    `;

    return product;
}


async function ObtenerProductoPorId(){
    var path= await ObtenerPathProduct();
    var productoId = ObtenerIdProducto();
    path+="/"+productoId;
    var producto = $.getJSON(path);
    return await producto;
}


async function RenderizarContenidoProducto(){
   
    var producto = await ObtenerProductoPorId();
    GuardarProductoEnHistorialLocalStorage(producto);
    var productoContainer = $('.mainContainer');
    productoContainer.html("");
    var productoHTML = ConstruirHtmlProducto(producto);
    productoContainer.append(productoHTML);

}



function GuardarProductoEnHistorialLocalStorage(producto){
    var historial =[];
    var producto = {
        id : producto.productId,
        precio : producto.price,
        imagen : producto.images.images[0].url,
        nombre : producto.name
    }
    if(!VerificarExistenciaHistorialLocalStorage()){
        historial.push(producto);
        GuardarHistorial(JSON.stringify(historial));
    }
    else{
        var historialLocalStorage = ObtenerHistorialLocalStorage();
        if(!ValidarExistenciaProductoHistorial(producto.id,historialLocalStorage)){
            historialLocalStorage.push(producto);
            GuardarHistorial(JSON.stringify(historialLocalStorage));
        }
    }
}

function AbrirFormularioCompartir(){
    $(".modal").css("display","block");
}

function CerrarFormularioCompartir(){
    $(".modal").css("display","none");
}

