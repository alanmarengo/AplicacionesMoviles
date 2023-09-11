$(function() {
    RenderizarContenido(1);
});

async function RenderizarContenido(numeropagina){
    var productos = await ObtenerProductosInicial(numeropagina);
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



async function ObtenerProductosInicial(numeropagina){
    var path = await ObtenerPathProduct("productosIniciales");
    var products = $.getJSON(path+"PageNumber="+numeropagina+"&PageSize=12");
    return await products;
}

function ConstruirHtmlProducto(element){
    var product = 
    `
    <article class="product">
    <div class="productImage">
        <img src= ${element.images[0].url} alt="">
        <h1>Oferta!</h1>
    </div>
    <div>
        <h3>${element.name}</h3>
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



function ConstruirHtmlCategoria(element){
  var CategoriaDesplegable = 
  `
  <li id=${element.categoriaId}> <img src="IMAGES/logocarrito.svg"> <a class="categoria">${element.descripcion} </a></li>
  `;
  return CategoriaDesplegable;
}

function ConstruirHtmlMarca(element){
    var MarcaDesplegable = 
    `
    <li id=${element.id}> <img src="IMAGES/logocarrito.svg"> <a class="marca">${element.description}</a></li>
    `;
    return MarcaDesplegable;
  }

async function  ObtenerPathProduct(servicio){
    var JSONCONFIG = $.getJSON("./CONFIG/config.json");
    var BodyJson = await JSONCONFIG;
    switch(servicio){
        case "productosIniciales":
            return BodyJson.PathProductBase;
    }
}