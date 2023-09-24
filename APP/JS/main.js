$(function() {
  RenderizarContenidoFooterYHeader();

  BindBuscador();
  BindFiltros();
  BindHistorial();
  BindCarro();
  


  $(".buscador-input").on('keyup', async function(){
    var longidutPalabra = $(this).val().length;
    if(longidutPalabra>=3){
      $(".buscadorDesplegable").css("margin-top","80px");
      await RenderizarContenidoProductoDesplegable($(this).val());
      if(screen.width <= 428){
      $(".mainContainer").css("filter","brightness(50%)");
      }
    }
    else{
      $(".buscadorDesplegable").css("margin-top","-8000px");
      $(".mainContainer").css("filter","brightness(100%)");
    }
  });

  $(".flechabuscador").on('click', function(){  
    $(".imagenCarrito").css("display","flex");
    $(".imagenBuscador").css("display","flex");
    $(".buscadorDesplegable").css("margin-top","-8000px");
    $(".logo").css("display","flex");
    $(".BuscadorDiv").removeClass("showConditionalFinder").addClass("hideConditionalFinder");
    $(".mainContainer").css("filter","brightness(100%)");
    $(".imagenUsuario").css("display","flex");
    $(".headerFinder").removeClass("headerFinder").addClass("header")
    $(".header").css("background-color","#70707");
    if(screen.width <= 767){
    $(".imagenHamburguesa").css("display","flex");
    }
  });

  $(".CerrarMapa").on('click', function(){  
    if(screen.width <= 428){
    $(".imagenUsuario").css("display","flex");
    $(".imagenHamburguesa").css("display","flex");
    $(".imagenCarrito").css("display","flex");
    $(".imagenBuscador").css("display","flex");
    $(".logo").css({"align-items":"center","justify-content":"center"});
    $(".logo").css("margin-left","5%");
    $(".CerrarMapa").css("display","none");
    $(".mainContainer").css("filter","brightness(100%)");
    $(".map").css("display","none");
    $('body,html').css({ "position": "", "overflow-y": "" });
    }
  });

  $(".cerrarDesplegable").on('click', function(){  
    BindHistorial();
    BindBuscador();
    BindFiltros();
    $(".CarritoDesplegable").css("margin-top","-800px");
    $(".mainContainer").css("filter","brightness(100%)");
    $(".filtro").css("filter","brightness(100%)");
    $(".cerrarDesplegable").css("display","none");
    $(".imagenCarrito").css("display","flex");
  });

  $(".imagenhamburguesacerrar").on('click', function(){
    BindCarro();
    BindHistorial();
    BindBuscador();
    $(".imagenhamburguesacerrar").css("display","none");
    $(".imagenHamburguesa").css("display","flex");
    $(".filtro").addClass("hideFiltro").removeClass("showFiltro");
    $(".mainContainer").css("filter","brightness(100%)");
  });

  $(".cerrarDesplegableHistorial").on('click', function(){
    BindCarro();
    BindBuscador();
    BindFiltros();
    $(".historialDesplegable").css("margin-top","-8000px");
    $(".imagenUsuario").css("display","block");
    $(".cerrarDesplegableHistorial").css("display","none");
    $(".mainContainer").css("filter","brightness(100%)");
  });

});

function EventoImagenCarrito(){
  $('.imagenUsuario').unbind();
  $(".imagenBuscador").unbind();
  $(".imagenHamburguesa").unbind();
  $(".CarritoDesplegable").css("margin-top","80px");
  $(".mainContainer").css("filter","brightness(50%)");
  $(".productsContainer").css("padding-top","10px");
  $(".imagenCarrito").css("display","none");
  $(".cerrarDesplegable").css("display","flex");
  RenderizarCarritoEnContenedor();
}

function BindCarro(){
  $(".imagenCarrito").on('click', function(){  
  $('.imagenUsuario').unbind();
  $(".imagenBuscador").unbind();
  $(".imagenHamburguesa").unbind();
  $(".CarritoDesplegable").css("margin-top","80px");
  if(screen.width <= 428){
    $(".mainContainer").css("filter","brightness(50%)");
  }
  $(".imagenCarrito").css("display","none");
  $(".cerrarDesplegable").css("display","flex");
  RenderizarCarritoEnContenedor();
 });
}

function BindHistorial(){
  $(".imagenUsuario").on('click', function(){  
    $(".imagenBuscador").unbind();
    $(".imagenHamburguesa").unbind();
    $('.imagenCarrito').unbind();
    $(".historialDesplegable").css("margin-top","80px");
    $(".imagenUsuario").css("display","none");
    $(".cerrarDesplegableHistorial").css("display","block");
    if(screen.width <= 428){
      $(".mainContainer").css("filter","brightness(50%)");
    }
    RenderizarProductosHistorial();
  });

}

function BindFiltros(){
  $(".imagenHamburguesa").on('click', function(){  
  $('.imagenCarrito').unbind();
  $('.imagenUsuario').unbind();
  $(".imagenBuscador").unbind();
  $(".filtro").removeClass("hideFiltro").addClass("showFiltro");
  $(".imagenHamburguesa").css("display","none");
  $(".imagenhamburguesacerrar").css("display","flex");
  $(".mainContainer").css("filter","brightness(50%)");
  });
}

function BindBuscador(){
  $(".imagenBuscador").on('click', function(){
    $(".imagenCarrito").css("display","none");
    $(".imagenUsuario").css("display","none");
    $(".imagenHamburguesa").css("display","none");
    $(".imagenBuscador").css("display","none");
    $(".logo").css("display","none");
    $(".BuscadorDiv").removeClass("hideConditionalFinder").addClass("showConditionalFinder");
    $(".header").removeClass("header").addClass("headerFinder")
  });
}



function RenderizarContenidoFooterYHeader(){
  $(".header").html("")
  $(".header").html(ContenidoHeader);
  $(".footer").html("")
  $(".footer").html(ContenidoFooter);
}



const ContenidoHeader = () => 
`<div class ="historialContainer">
  <img type="image" id="logoUsuario" class="imagenUsuario" src="IMAGES/historial.png" >
  <img class="cerrarDesplegableHistorial" src="IMAGES/CerrarDesplegable.png">
</div>
  <div class="hamburgesaContainer">
    <img type="image" id="logoHamburguesa" class="imagenHamburguesa" src="IMAGES/iconohamburguesa.svg" >
    <img type="imgage" id="checkhamburguesacerrar" class="imagenhamburguesacerrar" src="IMAGES/CerrarDesplegable.png" >
  </div>



  <div class="BuscadorDiv hideConditionalFinder">
      <img type="image" id="flecha" class="flechabuscador" src="IMAGES/flecha2.png" >
      <input id="buscador-boton"  type="text" class="buscador-input" placeholder="Busca tu producto">
          <img type="image" id="logobuscador" class="imagenBuscadorInput" src="IMAGES/logobuscador.svg" >
      </input>    
  </div>
  <div class="logo">
      <img type="image" src = "IMAGES/LOGO.svg" alt = "logo del proyecto">          
  </div>
  <div class ="buscadorContainer">
    <img type="image" id="logobuscador" class="imagenBuscador" src="IMAGES/logobuscador.svg" >
  </div>
  <div class="carritoContainer">
    <img type="image" id="logocarrito" class="imagenCarrito" src="IMAGES/logocarrito.svg" >
  <img class="cerrarDesplegable" src="IMAGES/CerrarDesplegable.png">
  </div>
  `;

const ContenidoFooter=()=>
  `
  <img src = "IMAGES/LOGO.svg" alt = "logo del proyecto">
  <img src="IMAGES/Logoubicacion.png" class="logoubicacion" onclick="DibujarMapa();">
  <div href="#">Ubicacion</div>
  <div class="mapaDesktop">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1638.6262233157468!2d-58.269671625550146!3d-34.774419574429004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32eb0350b768f%3A0xbd0aa21eac3ef032!2sUniversidad%20Nacional%20Arturo%20Jauretche!5e0!3m2!1ses!2sar!4v1695551869387!5m2!1ses!2sar" 
  width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  `;

