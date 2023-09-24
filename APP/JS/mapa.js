 DibujarMapa =() =>{
    $(".map").css("display","block");
    $(".CerrarMapa").css("display","block");
    $('body,html').css({ "position": "fixed", "overflow-y": "scroll" });
    $(".mainContainer").css("filter","brightness(10%)");
    $(".imagenCarrito").css("display","none");
    $(".imagenUsuario").css("display","none");
    $(".imagenHamburguesa").css("display","none");
    $(".imagenBuscador").css("display","none");
    $(".CerrarMapa").css("display","block");
    $(".logo").css("margin-left","-280px");

    $('body, html').animate({
        scrollTop: '0px'
    }, 300);
}
