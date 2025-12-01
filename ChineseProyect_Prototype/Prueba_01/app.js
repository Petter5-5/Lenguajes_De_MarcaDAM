const opciones = document.querySelectorAll('.opcion');
const contenido = document.getElementById('contenido');
const menu = document.getElementById("menu")



opciones.forEach(op => {
    op.addEventListener('click', () => {
        const color = op.dataset.color;

        menu.classList.add("colapsado");

        // Cambiar fondo a color sólido
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = color;

        // Animar el contenido
        contenido.style.transform = "translateX(150px)";
        contenido.textContent = `Elegiste: ${op.textContent}`;
    });
});
