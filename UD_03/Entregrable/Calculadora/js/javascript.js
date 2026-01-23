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

    var prenumeroFinal1 = 0;
    var prenumeroFinal2 = 0;
    var postnumeroFinal1 = 0;
    var postnumeroFinal2 = 0;
    var numeroEntero1 = 0;
    var numeroEntero2 = 0;
    var salida = 0;
    var operador = false;
    var puntito = false;
    var operacion = "";
    var contador_puntitos1 = 0;
    var contador_puntitos2 = 0;

    function actualizarPantalla()
    {
        if(!puntito)
        {
            if(!operador)
                pantalla_calculadora.textContent = `${prenumeroFinal1}`;
            else
                pantalla_calculadora.textContent = `${prenumeroFinal2}`;
        }
        else
        {
            if(!operador)
            {
                if(postnumeroFinal1 == 0 && contador_puntitos1 == 0)
                    pantalla_calculadora.textContent = `${prenumeroFinal1}.`;
                else
                    pantalla_calculadora.textContent = `${prenumeroFinal1}.${postnumeroFinal1}`;
            }
            else
            {
                if(postnumeroFinal2 == 0 && contador_puntitos2 == 0)
                    pantalla_calculadora.textContent = `${prenumeroFinal2}.`;
                else
                    pantalla_calculadora.textContent = `${prenumeroFinal2}.${postnumeroFinal2}`;
            } 
        }
    }

    function mostrarNumeroPantalla(num)
    {
        if(!puntito)
        {
            if(!operador)
            {
                prenumeroFinal1 *= 10;
                prenumeroFinal1 += num;
            }
            else
            {
                prenumeroFinal2 *= 10;
                prenumeroFinal2 += num;
            }
        }
        else
        {
            if(!operador)
            {
                postnumeroFinal1 *= 10;
                postnumeroFinal1 += num;
                contador_puntitos1++;
            }
            else
            {
                postnumeroFinal2 *= 10;
                postnumeroFinal2 += num;
                contador_puntitos2++;
            }
        }

        actualizarPantalla();
    };

    function retrocede()
    {
        if(!operador)
            prenumeroFinal1 = Math.trunc(prenumeroFinal1 / 10);
        else
            prenumeroFinal2 = Math.trunc(prenumeroFinal2 / 10);
        actualizarPantalla();
    }

    function borraEntrada()
    {
        if(!operador)
            prenumeroFinal1 = 0;
        else
            prenumeroFinal2 = 0;
        contador_puntitos1 = 0;
        contador_puntitos1 = 0;
        puntito = false;
        actualizarPantalla();
    }

    function borrarTodo()
    {
        prenumeroFinal1 = 0;
        prenumeroFinal2 = 0;
        contador_puntitos1 = 0;
        contador_puntitos1 = 0;
        operador = false;
        puntito = false;
        actualizarPantalla();
    }

    function calcularOperacion()
    {
        switch(operacion)
            {
                case "suma":
                    numeroEntero1 = juntarNumeros(prenumeroFinal1, postnumeroFinal1, contador_puntitos1);
                    numeroEntero2 = juntarNumeros(prenumeroFinal2, postnumeroFinal2, contador_puntitos2);   
                    salida = numeroEntero1 + numeroEntero2;
                    operador = false;
                    actualizarPantalla();
                break;
                case "menos":
                    prenumeroFinal1 = prenumeroFinal1 - prenumeroFinal2;
                    prenumeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                break;
                case "multiplicar":
                    numeroEntero1 = juntarNumeros(prenumeroFinal1, postnumeroFinal1, contador_puntitos1);
                    numeroEntero2 = juntarNumeros(prenumeroFinal2, postnumeroFinal2, contador_puntitos2);
                    salida = numeroEntero1 * numeroEntero2;
                    //
                    console.log(salida);
                    prenumeroFinal1 = rodadorComas(salida);
                    //
                    console.log(prenumeroFinal1);
                    prenumeroFinal1 = correccion2();
                    //
                    console.log(prenumeroFinal1);
                    postnumeroFinal2 = correcion();
                    //
                    console.log(postnumeroFinal2);
                    prenumeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                    puntito = false;
                break;
                case "dividir":
                    prenumeroFinal1 = prenumeroFinal1 / prenumeroFinal2;
                    prenumeroFinal2 = 0;
                    operador = false;
                    actualizarPantalla();
                break;
                /*case "inversor":
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
                break;*/
            }
    }

    function juntarNumeros(prePunto, postPunto, contador_puntitos)
    {
        return postPunto += (prePunto * Math.pow(10, contador_puntitos));
    }

    function rodadorComas(salida)
    {

        return salida * Math.pow(10, -(contador_puntitos1 + contador_puntitos2));
    }

    function correccion2(prenumeroFinal1)
    {
        return Math.trunc(prenumeroFinal1 * Math.pow(10, (contador_puntitos1 + contador_puntitos2))) * Math.pow(10, -(contador_puntitos1 + contador_puntitos2));
    }

    function correcion()
    {
        return (prenumeroFinal1 % 1) * Math.pow(10, (contador_puntitos1 + contador_puntitos2));
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
                operacion = "suma";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(menos)
        {
            menos.addEventListener("click", () => {
                operador = true;
                operacion = "menos";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(multiplicar)
        {
            multiplicar.addEventListener("click", () => {
                operador = true;
                operacion = "multiplicar";
                puntito = false;
                actualizarPantalla();
            });
        }

    if(dividir)
        {
            dividir.addEventListener("click", () => {
                operador = true;
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
