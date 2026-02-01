const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");
const p5 = document.getElementById("p5");

document.addEventListener("DOMContentLoaded", () => {
    let a = 12;
    let b = 5;
    let suma = a + b;
    let resta = a - b;
    let producto = a * b;
    let division = a / b;
    let resto = a%b;

    p1.textContent = `Suma = ${suma}`;
    p2.textContent = `resta = ${resta}`;
    p3.textContent = `producto = ${producto}`;
    p4.textContent = `division = ${division}`;
    p5.textContent = `resto = ${resto}`;
});