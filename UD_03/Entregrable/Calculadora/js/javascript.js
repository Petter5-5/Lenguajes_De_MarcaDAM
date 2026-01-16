const pantalla_calculadora = document.getElementById("pantalla_calculadora");
const btn1 = document.getElementById("btn1"); 
const btn2 = document.getElementById("btn2");
const btnretrocede = document.getElementById("btnretrocede");

document.addEventListener("DOMContentLoaded", () => {

    var numeroString = "";
    var numero;

    function mostrarNumeroPantalla(num)
    {
        numeroString += num;
        pantalla_calculadora.textContent = `${numeroString}`;
    };

    function retrocede()
    {
        var ultimo = numeroString.length;
        numeroString.charAt(ultimo) = ' ';
    }

    if(btnretrocede)
        {
            btnretrocede.addEventListener("click", () => {
                retrocede();
            });
        }

    if(btn1)
        {
            btn1.addEventListener("click", () => {
                var num = 1;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn2)
        {
            btn2.addEventListener("click", () => {
                var num = 2;
                mostrarNumeroPantalla(num);
            });
        }
});
