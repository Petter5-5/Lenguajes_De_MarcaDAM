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

    var numero1 = "";
    var numero2 = "";
    var segundoNumero = false;
    var resultado = false;
    var operador = "";
    
    function deshabilitarPunto()
    {

    }

    function habilitarPunto()
    {

    }

    function actualizarPantalla()
    {
            if(!segundoNumero)
                pantalla_calculadora.textContent = `${numero1}`;
            else
                pantalla_calculadora.textContent = `${numero2}`;
    }

    function mostrarNumeroPantalla(numero)
    {
        if(resultado)
            {
                document.getElementById("pantalla_calculadora").style.color = "#FFFFFF"
                numero1 = "";
                numero2 = "";
                console.log("hola");
            }

        if(!segundoNumero)
        {
            if(numero1.length < 12)
                numero1  += numero;
        }
        else
        {
            if(numero2.length < 12)
                numero2 += numero;
        }
        actualizarPantalla();
    }

    function mostrarPuntoPantalla()
    {
        if(!segundoNumero)
        {
            numero1  += ".";
        }
        else
        {
            numero2 += ".";
        }
        actualizarPantalla();
    }

    function manejarOperador()
    {

    }

    function calcularOperacion()
    {

    }

    function pantallaColorNormal()
    {

    }

    function borrarEntrada()
    {
        if(!segundoNumero)
        {
            numero1  = "";
        }
        else
        {
            numero2 = "";
        }
        actualizarPantalla();
    }

    function borrarTodo()
    {
        numero1  = "";
        numero2  = "";
        actualizarPantalla();
    }

    function retroceder()
    {
        if(!segundoNumero)
        {
            numero1  = numero1.substring(0, numero1.length - 1);
        }
        else
        {
            numero2 = numero2.substring(0, numero2.length - 1);
        }
        actualizarPantalla();
    }

    function operacionInmediata()
    {
        numero1 = parseFloat(numero1, 10);
        console.log(numero1)
        numero2 = parseFloat(numero2, 10);
        resultado = true;
        segundoNumero = false;
        switch(operador)
        {
            case "suma": 
                    numero1 = (numero1 + numero2).toString().substring(0, 12);
                    actualizarPantalla();
            break;
            case "restar": 
                    numero1 = (numero1 - numero2).toString().substring(0, 12);
                    actualizarPantalla();
            break;
            case "multiplicar": 
                    numero1 = (numero1 * numero2).toString().substring(0, 12);
                    actualizarPantalla();
            break;
            case "dividir": 
                    numero1 = (numero1 / numero2).toString().substring(0, 12);
                    actualizarPantalla();
            break;
            case "inversor":
                    numero1 = (1/numero1).toString().substring(0, 12);
                    actualizarPantalla();
            break;
            case "cuadrado":
                    numero1 = (Math.pow(numero1, 2)).toString().substring(0, 12);
                    actualizarPantalla();
            break;
            case "raiz":
                    numero1 = (Math.sqrt(numero1)).toString().substring(0, 12);
                    actualizarPantalla();
            break;
        }
    }

    function aplicarColorResultado()
    {
        switch(operador)
        {
            case "suma":
                    document.getElementById("pantalla_calculadora").style.color = "#4bff4b"
            break;
            case "restar":
                    document.getElementById("pantalla_calculadora").style.color = "#ff884b"
            break;
            case "multiplicar":
                    document.getElementById("pantalla_calculadora").style.color = "#ffbf00"
            break;
            case "dividir":
                    document.getElementById("pantalla_calculadora").style.color = "#00c8ff"
            break;
            case "inversor":
                    document.getElementById("pantalla_calculadora").style.color = "#b084ff"
            break;
            case "cuadrado":
                    document.getElementById("pantalla_calculadora").style.color = "#ff4bd8"
            break;
            case "raiz":
                    document.getElementById("pantalla_calculadora").style.color = "#00ffbf"
            break;
        }
    }

    if(btnretrocede)
        {
            btnretrocede.addEventListener("click", () => {
                retroceder();
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
                aplicarColorResultado();
                operacionInmediata();
            });
        }

    if(btnBorraEntrada)
        {
            btnBorraEntrada.addEventListener("click", () => {
                borrarEntrada();
            });
        }

    if(punto)
        {
            punto.addEventListener("click", () => {
                mostrarPuntoPantalla();
                actualizarPantalla();
            });
        }

    //Operadores
    if(suma)
        {
            suma.addEventListener("click", () => {
                operador = "suma";
                segundoNumero = true;
                actualizarPantalla();
            });
        }

    if(menos)
        {
            menos.addEventListener("click", () => {
                operador = "restar";
                segundoNumero = true;
                actualizarPantalla();
            });
        }

    if(multiplicar)
        {
            multiplicar.addEventListener("click", () => {
                operador = "multiplicar";
                segundoNumero = true;
                actualizarPantalla();
            });
        }

    if(dividir)
        {
            dividir.addEventListener("click", () => {
                operador = "dividir";
                segundoNumero = true;
                actualizarPantalla();
            });
        }

    if(inversor)
        {
            inversor.addEventListener("click", () => {
                operador = "inversor";
                actualizarPantalla();
            });
        }

    if(cuadrado)
        {
            cuadrado.addEventListener("click", () => {
                operador = "cuadrado";
                actualizarPantalla();
            });
        }

    if(raiz)
        {
            raiz.addEventListener("click", () => {
                operador = "raiz";
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
