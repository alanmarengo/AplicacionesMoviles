$(function() {
    Renderizar();
    
});
const marca = VerificarQuerStringMarca();
const categoria = VerificarQuerStringCategoria();
const numeroPagina = VerificarQueryStringNumeroPagina();
let marcaListado;
let categoriaListado;
async function Renderizar(){
    if(numeroPagina===null){
        RenderizarContenido(1,marca,categoria);
    }
    RenderizarContenido(numeroPagina,marca,categoria);
}

function ValidarUbicacionIndex(){
    return window.location.href.includes("index.html");
}

async function RenderizarContenido(numeropagina,marca,categoria){
    const productos = await ObtenerProductosInicial(numeropagina,marca,categoria);
    categoriaListado = productos.metadata.categoryFilters.categorys;
    marcaListado = productos.metadata.tradeMarkFilter;
    if(ValidarUbicacionIndex())
    {   
        renderizarProductos(productos.product);
        RenderizarFiltros();
        RenderizarPaginado(parseInt(productos.metadata.cantPage));
    }
    renderizarCategoriasDesplegable(categoriaListado);
    renderizarMarcasDesplegable(marcaListado);
}


function RenderizarFiltros(){
 if( marca || categoria || numeroPagina){

    let filtrosContainer = $('#filtros_container');
    filtrosContainer.html("");
    filtrosContainer.append(`<h5 class = "filtros"> Filtros</h5>`);
    if(marca){
        const marcaInfo = marcaListado[0];
        filtrosContainer.append(ConstuirHtmlMarcaFiltro(marcaInfo.description));
    }
    if(categoria){
        const categoriaInfo = categoriaListado[0];
        filtrosContainer.append(ConstuirHtmlCategoriaFiltro(categoriaInfo.descripcion));
    }
    if(numeroPagina>0){
        filtrosContainer.append(ConstuirHtmlPaginaFiltro(numeroPagina));
    }
}
}


function BorrarFiltroCategoria(){
    let url = window.location.href.replace('categoriaID='+categoria,"");
    window.location.href = url;
}

function BorrarFiltroMarca(){
    let url = window.location.href.replace('marcaID='+marca,"");
    window.location.href = url;
}

function BorrarFiltroPaginado(){
    let url = window.location.href.replace('numeroPagina='+numeroPagina,"");
    window.location.href = url;
}

function ConstuirHtmlCategoriaFiltro(descripcion){
    return `  
            
            <div class="filtrocategoria">
                <span> ${descripcion} </span>
                <button class="botonfiltrarcategoria" onclick="BorrarFiltroCategoria()"> X </button>
            </div>
    `;
}

function ConstuirHtmlMarcaFiltro(descripcion){
    return `    
            <div class="filtrocategoria">
                <span> ${descripcion} </span>
                <button class="botonfiltrarcategoria" onclick="BorrarFiltroMarca()"> X </button>
            </div>
    `;
}

function ConstuirHtmlPaginaFiltro(numeropagina){
    return `    
    <div class="filtrocategoria">
        <span> numeroPagina-${numeropagina} </span>
        <button class="botonfiltrarcategoria" onclick="BorrarFiltroPaginado()"> X </button>
    </div>
`;
}

function ConstruirHtmlPaginado(numeroPagina){
    return `<a id="pagina-${numeroPagina}" onclick="Filtrar(${categoria},${marca},'${numeroPagina}')"> ${numeroPagina} </a>`;
}

function RenderizarPaginado(cantidadPaginas){
    let cantidadPaginasAux = parseInt(cantidadPaginas);
    cantidadPaginasAux = cantidadPaginas = 0 ? 1 : ( cantidadPaginas > 6  ? 6 : cantidadPaginas);
    var contenedorpaginador = $('#paginador');
    contenedorpaginador.html("");
    contenedorpaginador.append(`<a href=""> << </a>`);
    for(i=0;i<=cantidadPaginasAux ;i++){
        const pagina = ConstruirHtmlPaginado(i+1);
        contenedorpaginador.append(pagina);
    }
    contenedorpaginador.append(`<a href=""> >> </a>`);
}

function renderizarProductos(productos){
    var contenedorproductos = $('#contenedorproductos');
    contenedorproductos.html("");
    productos.forEach(element => {     
        var product = ConstruirHtmlProducto(element);
        contenedorproductos.append(product);
        });
}

function renderizarCategoriasDesplegable(categorias){
    var categoryContainer = $('#listacategoria');
    categoryContainer.html("");
    categoryContainer.append('<H1 class="categoriadesplegable">Categorias</H1>');
    categorias.forEach(element => {   
        var category = ConstruirHtmlCategoria(element);
        categoryContainer.append(category);
        });
   
}
function renderizarMarcasDesplegable(marcas){
    var trademarkContainer = $('#listamarcas');
    trademarkContainer.html("");
    trademarkContainer.append('<H1 class="marcadesplegable">Marcas </H1>');
    marcas.forEach(element => {  
        var trademark = ConstruirHtmlMarca(element);
        trademarkContainer.append(trademark);
        });
}

function renderizarProductosDespleglables(productos){
    var productosBuscadorContainer = $('#buscadordesplegable');
    productosBuscadorContainer.html("");
    productos.forEach(element => {  
        var product = ConstruirHtmlProductoDesplegable(element);
        productosBuscadorContainer.append(product);
        });
}



async function ObtenerProductosInicial(numeropagina,marca,categoria){
    var path= await ConstruirPathFiltro(numeropagina,marca,categoria);
    var products = $.getJSON(path);
    return await products;
}

async function ConstruirPathFiltro(numeropagina,marca,categoria){
    var path = await ObtenerPathProduct();
    path+="?";
    path = numeropagina  >= 1 ? (path+"PageNumber="+numeropagina+"&PageSize=20") : (path+"PageNumber=1&PageSize=20");
    path = (categoria > 0 ) ? ( path +"&Categorical="+categoria) : path ;
    path = (marca > 0 ) ? ( path +"&TradeMark="+marca) : path ;
    return path;
}

async function ConstruirPathProductoCoincidencia(coincidencia){
    var path = await ObtenerPathProduct();
    path+="/GetProductByCoincidence?Coincidence="+coincidencia;
    return path;
}

function ConstruirHtmlProducto(element){
    var maxChars = 40;
    var textMax ="";
    if(element.name.length > maxChars){
        textMax = element.name.slice(0,maxChars)+"...";
    }else{
        textMax = element.name
    }

    var product = 
    `
    <article id=${element.productId} class="product">
    <div class="imagenproducto">
        <img src= ${element.images[0].url} alt="">
        <h1>Oferta!</h1>
    </div>
    <div class="datosproducto">
        <h3>${textMax}</h3>
        <br>    
        <h4>$${element.price}</h4>

        <h6>12 Cuotas fijas de</h6>
        <h6>$${(element.price)/12}</h6>
    </div>
    <br>
    <button onclick="RedirigirFichaProducto(${element.productId})" >VER MAS</button>
    </article>                   
    `;

    return product;
}


function ConstruirHtmlProductoDesplegable(element){
   var ProductoDesplegable =  
   `        <div id=${element.productId} class="itembusqueda" onclick="RedirigirFichaProducto(${element.productId})">
                <img src=${element.image} alt="">
                <div class="itembusquedadata">
                    <h4>
                    ${element.name}
                    </h4>
                    <h3>
                        $${element.price}
                    </h3>
                </div>
            </div>
            `;
    return ProductoDesplegable;
}



function ConstruirHtmlCategoria(element){
    let numeropaginaaux = numeroPagina;
  if(numeropaginaaux>1){
        numeropaginaaux = 1;
  }  
  var CategoriaDesplegable = 
  `<div class= contenedorcategoria>
  <li id=${element.categoriaId} onclick="Filtrar('${element.categoriaId}',${marca},'${numeropaginaaux}');" class ="categoriali"> 
  <img src="IMAGES/logocarrito.svg"> <a class="categoria">${element.descripcion} </a>
  </li>
  <div>
  `;
  return CategoriaDesplegable;
}

function ConstruirHtmlMarca(element){
    let numeropaginaaux = numeroPagina;
    if(numeropaginaaux>1){
          numeropaginaaux = 1;
    }  
    var marcadesplegable = 
    `
    <div class= contenedorcategoria>
    <li id=${element.id} onclick="Filtrar(${categoria},'${element.id}','${numeropaginaaux}');"> <img src="IMAGES/logocarrito.svg"> <a class="marca">${element.description}</a></li>
    <div>
    `;
    return marcadesplegable;
  }


function Filtrar(categoriaID,marcaID,numeroPagina){
    let url = "index.html?";
    if(marcaID){
        url+="marcaID="+marcaID+"&";
    }
    if(categoriaID){
        url+="categoriaID="+categoriaID+"&";
    }
    if(numeroPagina>=1){
        url+="numeroPagina="+numeroPagina;
    }
    window.location = url;
}

async function RenderizarContenidoProductoDesplegable(coincidencia){
    var productos = await ObtenerProductosPorCoincidencia(coincidencia);
    renderizarProductosDespleglables(productos.products);
    if(screen.width <= 428){

    }
}


async function  ObtenerPathProduct(){
    var JSONCONFIG = $.getJSON("./CONFIG/config.json");
    var BodyJson = await JSONCONFIG;
    return BodyJson.PathProductBase;
}



async function ObtenerProductosPorCoincidencia(coincidencia){
    var path= await ConstruirPathProductoCoincidencia(coincidencia);
    var products = $.getJSON(path);
    return await products;
}


function RedirigirFichaProducto(productoId){
    window.location = "producto.html?productoId="+productoId;
}


function VerificarQuerStringCategoria(){
    const parametros = new URL(location.href).searchParams;
    const categoriaID = parametros.get('categoriaID');
    return categoriaID;
}

function VerificarQuerStringMarca(){
    const parametros = new URL(location.href).searchParams;
    const marcaID = parametros.get('marcaID');
    return marcaID;
}

function VerificarQueryStringNumeroPagina(){
    const parametros = new URL(location.href).searchParams;
    const numeroPagina = parametros.get('numeroPagina');
    return numeroPagina;
}