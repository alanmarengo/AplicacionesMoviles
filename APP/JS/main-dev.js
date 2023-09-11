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
  });

  $(".flechabuscador").on('click', function(){  
    $(".imagenCarrito").css("display","flex");
    $(".imagenUsuario").css("display","flex");
    $(".imagenHamburguesa").css("display","flex");
    $(".imagenBuscador").css("display","flex");
    $(".logo").css("display","flex");
    $(".BuscadorDiv").css("display","none");
    $(".mainContainer").css("filter","brightness(100%)");
  });


  $(".imagenCarrito").on('click', function(){  
    $(".CarritoDesplegable").css("margin-top","70px");
    $(".mainContainer").css("filter","brightness(50%)");
    $(".productsContainer").css("padding-top","10px");

  });

  $(".cerrarDesplegable").on('click', function(){  
    $(".CarritoDesplegable").css("margin-top","-800px");
    $(".mainContainer").css("filter","brightness(100%)");
    $(".productsContainer").css("padding-top","50px");
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



  $(".categoria").on('click', function(){  
    window.location = "www.google.com"
  });








});