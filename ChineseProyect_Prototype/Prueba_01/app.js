const opciones = document.querySelectorAll('.opcion');
const contenido = document.getElementById('contenido');
const menu = document.getElementById("menu");
const menu2 = document.getElementById("menu2");
const volver = document.getElementById("volver");
const titulo = document.getElementById("titulo")

//slide
opciones.forEach(op => {
    op.addEventListener('click', () => {
        const color = op.dataset.color;

        menu.classList.add("colapsado");

        // Cambiar fondo a color sólido
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "rgba(187, 21, 199, 0.8)";

        // Animar el contenido
        titulo.textContent = op.textContent;
    });
});

//Ocultar menu grande
opciones.forEach(op => {
    op.addEventListener('click', () => {

        //ocultar menu grande
        menu.classList.add("oculto");
        menu.classList.remove("visible");

        //mostrar menu pequeño
        setTimeout(() => {
            menu2.classList.remove("oculto");
            menu2.classList.add("visible");
        }, 300);
    });
});

//Ocultar menu pqueño y volver al menu
volver.addEventListener('click', () => {

    //cargar imagen background
    document.body.style.backgroundImage = "url(img/chengdu-china.jpg)";
    document.body.style.backgroundColor = "black";

    //Ocultar menu pequeño
    menu2.classList.add("oculto");
    menu2.classList.remove("visible");

    //quitar el colapsado
    menu.classList.remove("colapsado");

    //si
    titulo.textContent = "欢迎";

    setTimeout(() => {

        //Mostrar menu grande
        menu.classList.remove("oculto");
        menu.classList.add("visible");
    }, 300)
});
