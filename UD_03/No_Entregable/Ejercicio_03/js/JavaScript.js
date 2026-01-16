const menor = document.getElementById("menor");
const mayor = document.getElementById("mayor");

document.addEventListener("DOMContentLoaded", () => {

    let numero = Math.random()* 101;
    let edad = Math.trunc(numero);

    if(edad >= 18)
        {
            mayor.textContent = `Es mayor de edad ${edad}`;
        }
    else
    {
        menor.textContent = `Es menor de edad ${edad}`;
    }
});