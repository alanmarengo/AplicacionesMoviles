$(function() {
    DesactivarCategoriasFichaProducto();
    RenderizarContenidoProducto();
});


function ObtenerIdProducto(){
    const parametros = new URL(location.href).searchParams;
    const productoId = parametros.get('productoId');
    return productoId;
}


async function  ObtenerPathProduct(){
    var JSONCONFIG = $.getJSON("./CONFIG/config.json");
    var BodyJson = await JSONCONFIG;
    return BodyJson.PathProductBase;
}

function ConstruirHtmlProducto(element){
    var product = 
    `
    <div class="fichadeproducto" id=${element.productId}>
    <div>
    <h2>${element.name}</h2>
        <div class="imagenproductodetalle">
            <img class="imagenproducto" src=${element.images.images[0].url} alt="">
            <h3>Oferta!</h3>
        </div>
    </div>
    
    <div class="contenedordetalleproducto">
        <div class="detalleproducto">
            <h1 class="precioproductoficha">$${element.price}</h1>
            <br>
            <button class="botoncomprartarjeta">COMPRAR</button>
            <button class="botonagregaralcarrito" onclick="GuardarProductoEnLocalStorage('${element.productId}','${element.price}','${element.images.images[0].url}','${1}','${element.name}' )" >AGREGAR AL CARRITO</button>
        </div>

        <div class="descripcionfichaproducto">
            <h4>
            ${element.publication.descripcion}
            </h4>
        </div>
        
        <div class="datosutilesfichaproducto">
            <div class="datosutilesfichaproducto-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/StockAlto.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="stockok">Stock alto en la web</h3>
                    <h3 class="GrayCaption">Solo para venta web </h3>
                </div>
            </div>
            <div class="datosutilesfichaproducto-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/SinStock.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="redCaption">SIN STOCK EN EL LOCAL</h3>
                    <h3 class="GrayCaption">Solo para venta presencial</h3>
                </div>
            </div>

            <div class="datosutilesfichaproducto-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/MaximusStore.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="GrayCaption">RETIRO <span style="color: #28FF0D">GRATIS!</span></h3>
                    <h3 class="GrayCaption">En la UNAJ! (Florencio varela)</h3>
                </div>
            </div>
            <div class="datosutilesfichaproducto-unidad">
                <div class="icono">
                    <img src="https://cdn.jsdelivr.net/gh/persano/bannersmaximus@1.1/CamionEnvios.svg" alt="">
                </div>
                <div class="textoDato">
                    <h3 class="GrayCaption">Envios a todo el pais</span></h3>
                    <h3 class="GrayCaption">En la UNAJ! (Florencio varela)</h3>
                </div>
            </div>
            <div class="contactContainer">
                <img class="contacItem" src="IMAGES/ICONS/MEDIA ICONS/f.png" alt="">
                <img class="contacItem" src="IMAGES/ICONS/MEDIA ICONS/i.png" alt="">
                <img class="contacItem" src="IMAGES/ICONS/MEDIA ICONS/w.png" alt="">
                <img id="abrirModal" class="contacItem" src="IMAGES/ICONS/MEDIA ICONS/s.png" alt="" onclick="AbrirFormularioCompartir()">
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
    var productoContainer = $('.maincontainer');
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

async function ValidarYEnviarCorreo(){
    const nombreUsuario = ObtenerNombreUsuarioFormulario();
    const CorreoUsuario = ObtenerCorreousuarioFormulario();
    let validacionInputsFormulario = ValidarInputsFormulario(nombreUsuario,CorreoUsuario);
    if(validacionInputsFormulario){
        const producto = await ObtenerProductoPorId()
        window.location="mailto:"+CorreoUsuario+"?body="+"Hola, mi nombre es:"+nombreUsuario+"."+" En esta ocasion me gustaria compartirte el siguiente producto: nombre: "+producto.name+""+"precio: $"+producto.price;
        CerrarFormularioCompartir();
    }
}


function ObtenerCorreousuarioFormulario(){
    const Correo =  $("#correo").val();
    return Correo;
    
}

function ObtenerNombreUsuarioFormulario(){
    const nombre =  $("#nombres").val();
    return nombre;
} 

function CerrarFormularioCompartir(){
    let modal = $(".modal");
    modal.css("display","none")
}

function ValidarInputsFormulario(nombre,correo){
    let valido = false;
    let alertas = $("#Alertas").html("");
    const validacionNombre = validarNombreFormulario(nombre);
    const validacionCorreo = validarCorreoFormulario(correo);
    if(!validacionNombre){
        alertas.append("El nombre es invalido");
    }
    if(!validacionCorreo){
        alertas.append("El correo es invalido");
    }
    if(validacionNombre && validacionCorreo){
        valido = true;
    }
    return valido;
}


function validarNombreFormulario(nombre){
    const longitudNombre = nombre.length;
    return longitudNombre >= 4 ;
}

function validarCorreoFormulario(correo){
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    return regexEmail.test(correo);
}


function DesactivarCategoriasFichaProducto(){
    if(screen.width > 428){
        $(".filtro").css("display","none");
    }
}


