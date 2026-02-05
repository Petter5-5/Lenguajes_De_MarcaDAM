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
    var solucion = false;
    var operador = "";
    
    function deshabilitarPunto()
    {
        document.getElementById("punto").classList.add("desabilitado")
    }

    function habilitarPunto()
    {
        document.getElementById("punto").classList.remove("desabilitado")
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
        if(solucion)
            {
                document.getElementById("pantalla_calculadora").style.color = "#FFFFFF"
                numero1 = "";
                numero2 = "";
                operador = "";
                solucion = false;
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
            if(!numero1.toString().includes("."))
            numero1  += ".";
        }
        else
        {
            if(!numero2.toString().includes("."))
            numero2 += ".";
        }
    }
    function borrarEntrada()
    {
        if(!segundoNumero)
        {
            numero1  = "";
            habilitarPunto()
            pantalla_calculadora.textContent = `0`;
        }
        else
        {
            numero2 = "";
            habilitarPunto()
            pantalla_calculadora.textContent = `0`;
        }
        actualizarPantalla();
    }

    function borrarTodo()
    {
        numero1  = "";
        numero2  = "";
        operador = "";
        habilitarPunto()
        actualizarPantalla();
    }

    function retroceder()
    {
        if(!segundoNumero)
        {
            numero1  = numero1.substring(0, numero1.length - 1);
            if(!numero1.toString().includes("."))
                habilitarPunto();
        }
        else
        {
            numero2 = numero2.substring(0, numero2.length - 1);
            if(!numero2.toString().includes("."))
                habilitarPunto();
        }
        actualizarPantalla();
    }

    function operacionInmediata()
    {
        numero1 = parseFloat(numero1);
        console.log(numero1)
        numero2 = parseFloat(numero2);
        if(isNaN(numero2))
            numero2 = 0;
        solucion = true;
        segundoNumero = false;
        switch(operador)
        {
            case "suma": 
                    numero1 = (numero1 + numero2).toString().substring(0, 12);
                    console.log(numero1)
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
                    if(numero2 == 0)
                    {
                        document.getElementById("pantalla_calculadora").style.color = "#FF0000"
                        pantalla_calculadora.textContent = `Error`;
                    }
                    else
                    {
                    numero1 = (numero1 / numero2).toString().substring(0, 12);
                    actualizarPantalla();
                    }
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
                    if(numero1 < 0 || isNaN(numero1))
                    {
                        document.getElementById("pantalla_calculadora").style.color = "#FF0000"
                        pantalla_calculadora.textContent = `Error`;
                    }
                    else
                    {
                    numero1 = (Math.sqrt(numero1)).toString().substring(0, 12);
                    actualizarPantalla();
                    }
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
                habilitarPunto();
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
                deshabilitarPunto();
                mostrarPuntoPantalla();
                actualizarPantalla();
            });
        }

    //Operadores
    if(suma)
        {
            suma.addEventListener("click", () => {
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "suma";
                segundoNumero = true;
                habilitarPunto();
            });
        }

    if(menos)
        {
            menos.addEventListener("click", () => {
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "restar";
                segundoNumero = true;
                habilitarPunto();
            });
        }

    if(multiplicar)
        {
            multiplicar.addEventListener("click", () => {
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "multiplicar";
                segundoNumero = true;
                habilitarPunto();
            });
        }

    if(dividir)
        {
            dividir.addEventListener("click", () => {
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "dividir";
                segundoNumero = true;
                habilitarPunto();
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

    document.addEventListener("keydown", function(e) {
        switch(e.key) {
            case "0":
                var num = 0;
                mostrarNumeroPantalla(num);
                break;
            case "1":
                var num = 1;
                mostrarNumeroPantalla(num);
                break; 
            case "2":
                var num = 2;
                mostrarNumeroPantalla(num);
                break; 
            case "3":
                var num = 3;
                mostrarNumeroPantalla(num);
                break; 
            case "4":
                var num = 4;
                mostrarNumeroPantalla(num);
                break;
            case "5":
                var num = 5;
                mostrarNumeroPantalla(num);
                break; 
            case "6": 
                var num = 6;
                mostrarNumeroPantalla(num);
                break;
            case "7": 
                var num = 7;
                mostrarNumeroPantalla(num);
                break;
            case "8":
                var num = 8;
                mostrarNumeroPantalla(num);
                break; 
            case "9":
                var num = 9;
                mostrarNumeroPantalla(num);
                break;
            case ".":
                deshabilitarPunto();
                mostrarPuntoPantalla();
                actualizarPantalla();
                break;
            case "+":
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "suma";
                segundoNumero = true;
                habilitarPunto();
                break;
            case "-":
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "restar";
                segundoNumero = true;
                habilitarPunto();
                break;
            case "*":
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "multiplicar";
                segundoNumero = true;
                habilitarPunto();
                break;
            case "/":
                e.preventDefault();
                if(!operador)
                    pantalla_calculadora.textContent = `0`;
                operador = "dividir";
                segundoNumero = true;
                habilitarPunto();
                break;
            case "Enter":
                aplicarColorResultado();
                operacionInmediata();
                habilitarPunto();
            case "Backspace":
                retroceder();
                break;
            case "Escape":
                borrarTodo();
                break;
        }
    });
});
