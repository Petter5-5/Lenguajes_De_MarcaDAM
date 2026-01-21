const pantalla_calculadora = document.getElementById("pantalla_calculadora");

const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1"); 
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");

const resultado = document.getElementById("resultado");
const suma = document.getElementById("suma");
const menos = document.getElementById("menos");
const multiplicar = document.getElementById("multiplicar");
const dividir = document.getElementById("dividir");
const inversor = document.getElementById("inversor");
const cuadrado = document.getElementById("cuadrado");
const raiz = document.getElementById("raiz");

const btnretrocede = document.getElementById("btnretrocede");
const btnBorraEntrada = document.getElementById("borraEntrada");
const eliminar = document.getElementById("eliminar");

const punto = document.getElementById("punto");

document.addEventListener("DOMContentLoaded", () => {

    var numeroFinal = 0;
    var numeroFinal2 = 0;
    var operador = false;
    var puntito = false;
    var operacion = "";
    var contador_puntitos = 1;

    function actualizarPantalla()
    {
        if(operador)
            pantalla_calculadora.textContent = `${numeroFinal2}`;
        else
            pantalla_calculadora.textContent = `${numeroFinal}`;

    }

    function mostrarNumeroPantalla(num)
    {
        var divisor = Math.pow(10,-contador_puntitos);
        if(!puntito)
        {
            if(!operador)
            {
                numeroFinal *= 10;
                numeroFinal += num;
            }
            else
            {
                numeroFinal2 *= 10;
                numeroFinal2 += num;
            }
        }
        else
        {
            if(!operador)
            {
                
                num *= divisor;
                num = num.toFixed(contador_puntitos)
                numeroFinal += num;
                contador_puntitos++;
            }
            else
            {
                num *= divisor;
                num = num.toFixed(contador_puntitos)
                numeroFinal2 += num;
                contador_puntitos++;
            }
        }

        actualizarPantalla();
    };

    function retrocede()
    {
        if(operador)
            numeroFinal2 = Math.trunc(numeroFinal2 / 10);
        else
            numeroFinal = Math.trunc(numeroFinal / 10);
        actualizarPantalla();
    }

    function borraEntrada()
    {
        if(operador)
            numeroFinal2 = 0;
        else
            numeroFinal = 0;
        contador_puntitos = 10;
        puntito = false;
        actualizarPantalla();
    }

    function borrarTodo()
    {
        numeroFinal = 0;
        numeroFinal2 = 0;
        contador_puntitos = 10;
        operador = false;
        puntito = false;
        actualizarPantalla();
    }

    function calcularOperacion()
    {
        switch(operacion)
            {
                case "suma":
                    numeroFinal = numeroFinal + numeroFinal2;
                    numeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                break;
                case "menos":
                    numeroFinal = numeroFinal - numeroFinal2;
                    numeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                break;
                case "multiplicar":
                    numeroFinal = numeroFinal * numeroFinal2;
                    numeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                break;
                case "dividir":
                    numeroFinal = numeroFinal / numeroFinal2;
                    numeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                break;
                case "inversor":
                    numeroFinal = 1 / numeroFinal;
                    puntito = false;
                    actualizarPantalla();
                break;
                case "cuadrado":
                    numeroFinal = Math.pow(numeroFinal, 2);
                    puntito = false;
                    actualizarPantalla();
                break;
                case "raiz":
                    numeroFinal = Math.sqrt(numeroFinal);
                    puntito = false;
                    actualizarPantalla();
                break;
            }
    }

    //Comodines
    if(btnretrocede)
        {
            btnretrocede.addEventListener("click", () => {
                retrocede();
            });
        }

    if(eliminar)
        {
            eliminar.addEventListener("click", () => {
                borrarTodo();
            });
        }

    if(resultado)
        {
            resultado.addEventListener("click", () => {
                calcularOperacion();
            });
        }

    if(btnBorraEntrada)
        {
            btnBorraEntrada.addEventListener("click", () => {
                borraEntrada();
            });
        }

    if(punto)
        {
            punto.addEventListener("click", () => {
                puntito = true;

                actualizarPantalla();
            });
        }

    //Operadores
    if(suma)
        {
            suma.addEventListener("click", () => {
                operador = true;
                contador_puntitos = 10;
                operacion = "suma";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(menos)
        {
            menos.addEventListener("click", () => {
                operador = true;
                contador_puntitos = 10;
                operacion = "menos";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(multiplicar)
        {
            multiplicar.addEventListener("click", () => {
                operador = true;
                contador_puntitos = 10;
                operacion = "multiplicar";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(dividir)
        {
            dividir.addEventListener("click", () => {
                operador = true;
                contador_puntitos = 10;
                operacion = "dividir";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(inversor)
        {
            inversor.addEventListener("click", () => {
                operacion = "inversor";
                actualizarPantalla();
            });
        }

    if(cuadrado)
        {
            cuadrado.addEventListener("click", () => {
                operacion = "cuadrado";
                actualizarPantalla();
            });
        }

    if(raiz)
        {
            raiz.addEventListener("click", () => {
                operacion = "raiz";
                actualizarPantalla();
            });
        }
    
    //Numeros
    if(btn0)
        {
            btn0.addEventListener("click", () => {
                var num = 0;
                mostrarNumeroPantalla(num);
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
    if(btn3)
        {
            btn3.addEventListener("click", () => {
                var num = 3;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn4)
        {
            btn4.addEventListener("click", () => {
                var num = 4;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn5)
        {
            btn5.addEventListener("click", () => {
                var num = 5;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn6)
        {
            btn6.addEventListener("click", () => {
                var num = 6;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn7)
        {
            btn7.addEventListener("click", () => {
                var num = 7;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn8)
        {
            btn8.addEventListener("click", () => {
                var num = 8;
                mostrarNumeroPantalla(num);
            });
        }
    if(btn9)
        {
            btn9.addEventListener("click", () => {
                var num = 9;
                mostrarNumeroPantalla(num);
            });
        }
});
