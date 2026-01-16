const resultado = document.getElementById("resultado");
const malo = document.getElementById("malo");

document.addEventListener("DOMContentLoaded", () => {
    let numero = Math.trunc(Math.random() * 16 + 1);
    let mes = "";


    if(numero < 13)
        {
            switch(numero)
            {
                case 1: mes = "enero";
                break;
                case 2: mes = "febrero";
                break;
                case 3: mes = "marzo";
                break;
                case 4: mes = "abril";
                break;
                case 5: mes = "mayo";
                break;
                case 6: mes = "junio";
                break;
                case 7: mes = "julio";
                break;
                case 8: mes = "agosto";
                break;
                case 9: mes = "septiembre";
                break;
                case 10: mes = "octubre";
                break;
                case 11: mes = "noviembre";
                break;
                default: mes = "diciembre";
                break;
            }
            resultado.textContent = `El numero ${numero} es ${mes}`;
        }
    else
    {
        malo.textContent = `Numero no valido para seleccionar un mes ${numero}`;
    }
});