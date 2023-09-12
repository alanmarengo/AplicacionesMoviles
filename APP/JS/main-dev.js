$(function() {
  $(".imagenBuscador").on('click', function(){
    //recordar que aqui se debe preguntar si es != de resolucion mobile
    
    $(".imagenCarrito").css("display","none");
    $(".imagenUsuario").css("display","none");
    $(".imagenHamburguesa").css("display","none");
    $(".imagenBuscador").css("display","none");
    $(".logo").css("display","none");
    $(".BuscadorDiv").css("display","grid");
    $(".mainContainer").css("filter","brightness(50%)");
    $(".header").css("background-color","#5B21A5");
  });

  $(".buscador-input").on('keyup', function(){
    //recordar que aqui se debe preguntar si es != de resolucion mobile
    var longidutPalabra = $(this).val().length;
    if(longidutPalabra>=3){
      $(".buscadorDesplegable").css("margin-top","70px");
    }
    else{
      $(".buscadorDesplegable").css("margin-top","-8000px");
    }
  });



  $(".flechabuscador").on('click', function(){  
    $(".imagenCarrito").css("display","flex");
    $(".imagenUsuario").css("display","flex");
    $(".imagenHamburguesa").css("display","flex");
    $(".imagenBuscador").css("display","flex");
    $(".logo").css("display","flex");
    $(".BuscadorDiv").css("display","none");
    $(".mainContainer").css("filter","brightness(100%)");
    $(".header").css("background-color","#707070");
    $(".buscadorDesplegable").css("margin-top","-8000px");
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


  $(".categoriali").on('click', function(){  
    $(".filtro").css("margin-top","-8000px");
  });

});