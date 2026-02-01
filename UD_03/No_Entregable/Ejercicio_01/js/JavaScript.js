const resultado = document.getElementById("resultado");

document.addEventListener("DOMContentLoaded", () => {
    let nombre = "Yeray";
    let edad = 19;
    resultado.textContent = 
    `Hola me llamo: ${nombre}
    Tengo ${edad} años`;
});
