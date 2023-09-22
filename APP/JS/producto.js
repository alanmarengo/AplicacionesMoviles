$(function() {
    Renderizar();
    
});
const marca =VerificarQuerStringMarca();
const categoria = VerificarQuerStringCategoria();
let marcaListado;
let categoriaListado;
async function Renderizar(){
    RenderizarContenido(1,marca,categoria);
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
    }
    renderizarCategoriasDesplegable(categoriaListado);
    renderizarMarcasDesplegable(marcaListado);
}





function RenderizarFiltros(){
 if( marca || categoria){
    //a este poner :
     /*
        display: flex
        flex-wrap: wrap
        
     */

     //al 5h un width: 100%   
    const filtrosContainer = $('#filtros_container');
    filtrosContainer.append(`<h5 class = "filtros"> Filtros</h5>`);
    if(marca){
        const marcaInfo = marcaListado[0];
        filtrosContainer.append(ConstuirHtmlMarcaFiltro(marcaInfo.description));
    }
    if(categoria){
        const categoriaInfo = categoriaListado[0];
        filtrosContainer.append(ConstuirHtmlCategoriaFiltro(categoriaInfo.descripcion));
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

function ConstuirHtmlCategoriaFiltro(descripcion){
    return `  
            
            <div class="categoriaFiltro">
                <span> ${descripcion} </span>
                <button class="butonFiltro" onclick="BorrarFiltroCategoria()"> X </button>
            </div>
    `;
}

function ConstuirHtmlMarcaFiltro(descripcion){
    return `    
            <div class="categoriaFiltro">
                <span> ${descripcion} </span>
                <button class="butonFiltro" onclick="BorrarFiltroMarca()"> X </button>
            </div>
    `;
}




function renderizarProductos(productos){
    var productsContainer = $('#ProductsContainer');
    productsContainer.html("");
    productos.forEach(element => {     
        var product = ConstruirHtmlProducto(element);
        productsContainer.append(product);
        });
}

function renderizarCategoriasDesplegable(categorias){
    var categoryContainer = $('#CategoriaList');
    categoryContainer.html("");
    categoryContainer.append('<H1 class="CategoriaDeplegable">Categorias</H1>');
    categorias.forEach(element => {   
        var category = ConstruirHtmlCategoria(element);
        categoryContainer.append(category);
        });
   
}
function renderizarMarcasDesplegable(marcas){
    var trademarkContainer = $('#MarcasList');
    trademarkContainer.html("");
    trademarkContainer.append('<H1 class="MarcaDesplegable">Marcas </H1>');
    marcas.forEach(element => {  
        var trademark = ConstruirHtmlMarca(element);
        trademarkContainer.append(trademark);
        });
}

function renderizarProductosDespleglables(productos){
    var productosBuscadorContainer = $('#buscadorDesplegable');
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
    path = numeropagina  !== null || numeropagina !== 'undefined' ? (path+"PageNumber="+numeropagina+"&PageSize=20") : (path+"PageNumber=1&PageSize=20");
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
    <div class="productImage">
        <img src= ${element.images[0].url} alt="">
        <h1>Oferta!</h1>
    </div>
    <div class="DataProduct">
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
   `        <div id=${element.productId} class="itemBusqueda" onclick="RedirigirFichaProducto(${element.productId})">
                <img src=${element.image} alt="">
                <div class="itemBusquedaData">
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
  var CategoriaDesplegable = 
  `<div class= contenedorCategoria>
  <li id=${element.categoriaId} onclick="Filtrar('${element.categoriaId}',${marca});" class ="categoriali"> 
  <img src="IMAGES/logocarrito.svg"> <a class="categoria">${element.descripcion} </a>
  </li>
  <div>
  `;
  return CategoriaDesplegable;
}

function ConstruirHtmlMarca(element){
    var MarcaDesplegable = 
    `
    <div class= contenedorCategoria>
    <li id=${element.id} onclick="Filtrar(${categoria},'${element.id}');"> <img src="IMAGES/logocarrito.svg"> <a class="marca">${element.description}</a></li>
    <div>
    `;
    return MarcaDesplegable;
  }


function Filtrar(categoriaID,marcaID){
    let url = "http://127.0.0.1:5500/APP/index.html?";
    if(marcaID){
        url+="marcaID="+marcaID+"&";
    }
    if(categoriaID){
        url+="categoriaID="+categoriaID;
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
    var JSONCONFIG = $.getJSON("http://127.0.0.1:5500/APP/CONFIG/config.json");
    var BodyJson = await JSONCONFIG;
    return BodyJson.PathProductBase;
}



async function ObtenerProductosPorCoincidencia(coincidencia){
    var path= await ConstruirPathProductoCoincidencia(coincidencia);
    var products = $.getJSON(path);
    return await products;
}


function RedirigirFichaProducto(productoId){
    window.location = "http://127.0.0.1:5500/APP/PAGES/producto.html?productoId="+productoId;
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