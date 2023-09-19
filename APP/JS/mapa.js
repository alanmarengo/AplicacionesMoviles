 DibujarMapa =() =>{
    $(".CerrarMapa").css("display","block");
    var map = L.map('map').setView([-34.775482,-58.266810],16);
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

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.775482,-58.266810]).addTo(map)
    .bindPopup('Aqui nos encontramos.')
    .openPopup();
}
