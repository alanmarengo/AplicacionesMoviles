$(function() {
    RenderizarContenido(1);
});

async function RenderizarContenido(numeropagina,marca,categoria){
    var productos = await ObtenerProductosInicial(numeropagina,marca,categoria);
    renderizarProductos(productos.product);
    renderizarCategoriasDesplegable(productos.metadata.categoryFilters.categorys);
    renderizarMarcasDesplegable( productos.metadata.tradeMarkFilter);
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
    var path = await ObtenerPathProduct("productosIniciales");
    path+="?";
    path = numeropagina  !== null || numeropagina !== 'undefined' ? (path+"PageNumber="+numeropagina+"&PageSize=20") : (path+"PageNumber=1&PageSize=20");
    path = (categoria > 0 ) ? ( path +"&Categorical="+categoria) : path ;
    path = (marca > 0 ) ? ( path +"&TradeMark="+marca) : path ;
    return path;
}

async function ConstruirPathProductoCoincidencia(coincidencia){
    var path = await ObtenerPathProduct("productosIniciales");
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
    <article class="product">
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
    <button>VER MAS</button>
    </article>                   
    `;

    return product;
}


function ConstruirHtmlProductoDesplegable(element){
   var ProductoDesplegable =  
   `        <div id=${element.productId} class="itemBusqueda">
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
  <li id=${element.categoriaId} onclick="RenderizarContenidoCategoriaDesplegable('${element.categoriaId}');" class ="categoriali"> 
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
    <li id=${element.id} onclick="RenderizarContenidoMarcaDesplegable('${element.id}');"> <img src="IMAGES/logocarrito.svg"> <a class="marca">${element.description}</a></li>
    <div>
    `;
    return MarcaDesplegable;
  }

async function RenderizarContenidoCategoriaDesplegable(idcategoria){
    await RenderizarContenido(1,null,idcategoria);
    if(screen.width <= 428){
    $(".imagenhamburguesacerrar").css("display","none");
    $(".imagenHamburguesa").css("display","flex");
    $(".filtro").css("margin-top","-8000px");
    $(".mainContainer").css("filter","brightness(100%)");
    }
}

async function RenderizarContenidoMarcaDesplegable(idMarca){
    await RenderizarContenido(1,idMarca,null);
    if(screen.width <= 428){
    $(".imagenhamburguesacerrar").css("display","none");
    $(".imagenHamburguesa").css("display","flex");
    $(".filtro").css("margin-top","-8000px");
    $(".mainContainer").css("filter","brightness(100%)");
    }
}

async function RenderizarContenidoProductoDesplegable(coincidencia){
    var productos = await ObtenerProductosPorCoincidencia(coincidencia);
    renderizarProductosDespleglables(productos.products);
    if(screen.width <= 428){

    }
}


async function  ObtenerPathProduct(servicio){
    var JSONCONFIG = $.getJSON("./CONFIG/config.json");
    var BodyJson = await JSONCONFIG;
    switch(servicio){
        case "productosIniciales":
            return BodyJson.PathProductBase;
    }
}



async function ObtenerProductosPorCoincidencia(coincidencia){
    var path= await ConstruirPathProductoCoincidencia(coincidencia);
    var products = $.getJSON(path);
    return await products;
}