$(function() {
  $(".imagenBuscador").on('click', function(){
    $(".imagenCarrito").css("display","none");
    $(".imagenUsuario").css("display","none");
    $(".imagenHamburguesa").css("display","none");
    $(".imagenBuscador").css("display","none");
    $(".logo").css("display","none");
    $(".BuscadorDiv").css("display","grid");
    $(".header").css("background-color","#5B21A5");
  });

  $(".buscador-input").on('keyup', async function(){
    var longidutPalabra = $(this).val().length;
    if(longidutPalabra>=3){
      $(".buscadorDesplegable").css("margin-top","70px");
      await RenderizarContenidoProductoDesplegable($(this).val());
      $(".mainContainer").css("filter","brightness(50%)");
    }
    else{
      $(".buscadorDesplegable").css("margin-top","-8000px");
      $(".mainContainer").css("filter","brightness(100%)");
    }
  });

  $(".flechabuscador").on('click', function(){  
    $(".imagenCarrito").css("display","flex");
    $(".imagenBuscador").css("display","flex");
    $(".header").css("background-color","#707070");
    $(".buscadorDesplegable").css("margin-top","-8000px");
    $(".logo").css("display","flex");
    $(".BuscadorDiv").css("display","none");
    $(".mainContainer").css("filter","brightness(100%)");
    if(screen.width <= 428){
    $(".imagenUsuario").css("display","flex");
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
    map.remove();
    }
  });

  $(".imagenCarrito").on('click', function(){  
    $(".CarritoDesplegable").css("margin-top","70px");
    $(".mainContainer").css("filter","brightness(50%)");
    $(".productsContainer").css("padding-top","10px");
    $(".imagenCarrito").css("display","none");
    $(".cerrarDesplegable").css("display","flex");

  });

  $(".cerrarDesplegable").on('click', function(){  
    $(".CarritoDesplegable").css("margin-top","-800px");
    $(".mainContainer").css("filter","brightness(100%)");
    $(".productsContainer").css("padding-top","50px");
    $(".cerrarDesplegable").css("display","none");
    $(".imagenCarrito").css("display","flex");
  });

  $(".imagenHamburguesa").on('click', function(){  
    $(".filtro").css("margin-top","70px");
    $(".imagenHamburguesa").css("display","none");
    $(".imagenhamburguesacerrar").css("display","flex");
    $(".mainContainer").css("filter","brightness(50%)");
  });

  $(".imagenhamburguesacerrar").on('click', function(){  
    $(".imagenhamburguesacerrar").css("display","none");
    $(".imagenHamburguesa").css("display","flex");
    $(".filtro").css("margin-top","-8000px");
    $(".mainContainer").css("filter","brightness(100%)");
  });
});