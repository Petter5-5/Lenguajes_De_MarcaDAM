
const btnPiedra = document.getElementById("piedra");
const btnPapel = document.getElementById("papel");
const btnTijera = document.getElementById("tijera");
const btnLargto = document.getElementById("lagarto");
const btnSpock = document.getElementById("spock");

const tu = document.getElementById("tu");
const cpu = document.getElementById("cpu");


document.addEventListener("DOMContentLoaded", () => {

    function mostrarEleccion(eleccion, jugador)
    {
        if(jugador == "Usuario")
        {
            switch(eleccion)
            {
                case "piedra":
                    tu.style.display = "";
                    tu.textContent = `🪨 Piedra`;
                    break;
                case "papel":
                    tu.textContent = ``;
                    break;
                case "tijera":
                    tu.textContent = ``;
                    break;
                case "lagarto":
                    tu.textContent = ``;
                    break;
                case "spock":
                    tu.textContent = ``;
                    break;
            }
        }
        else
        {

        }
    }

    function jugar(eleccionUsuario)
    {
        mostrarEleccion(eleccionUsuario, "Usuario");
        var eleccionCPU = obtenerEleccionCPU();
        mostrarEleccion(eleccionCPU, "CPU");
        var resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);
    }

    function obtenerEleccionCPU()
    {
        var random = Math.floor(Math.random()*5);
        switch(random)
        {
            case 0:
                var eleccionCPU = "piedra";
                break;
            case 1:
                var eleccionCPU = "papel";
                break;
            case 2:
                var eleccionCPU = "tijera";
                break;
            case 3:
                var eleccionCPU = "lagarto";
                break;
            case 4:
                var eleccionCPU = "spock";
                break;
        }
        return eleccionCPU;
    }

    function calcularResultadoJugada(usuario, cpu)
    {
        var resultado = false;
        var empate = false;
        var conclusion;
        switch(usuario)
        {
            case "piedra":
                    if(cpu == "lagarto" || cpu == "tijera")
                        resultado = true;
                    if(cpu == "spock" || cpu == "papel")
                        resultado = false;
                    if(cpu == "piedra")
                        empate = true;
                break;
            case "papel":
                    if(cpu == "spock" || cpu == "piedra")
                        resultado = true;
                    if(cpu == "lagarto" || cpu == "tijera")
                        resultado = false;
                    if(cpu == "papel")
                        empate = true;
                break;
            case "tijera":
                    if(cpu == "lagarto" || cpu == "papel")
                        resultado = true;
                    if(cpu == "spock" || cpu == "piedra")
                        resultado = false;
                    if(cpu == "tijera")
                        empate = true;
                break;
            case "lagarto":
                    if(cpu == "spock" || cpu == "papel")
                        resultado = true;
                    if(cpu == "piedra" || cpu == "tijera")
                        resultado = false;
                    if(cpu == "lagarto")
                        empate = true;
                break;
            case "spock":
                    if(cpu == "tijera" || cpu == "piedra")
                        resultado = true;
                    if(cpu == "lagarto" || cpu == "papel")
                        resultado = false;
                    if(cpu == "spock")
                        empate = true;
                break;
        }

        if(!empate)
        {
            if(resultado)
                conclusion = "VICTORIA"
            else
                conclusion = "DERROTA"
        }
        else
            conclusion = "EMPATE";

        return conclusion;
    }

    if(btnPiedra){
        btnPiedra.addEventListener("click", () => {
            var eleccionUsuario = "piedra";
            jugar(eleccionUsuario)
        });
    }

    if(btnPapel){
        btnPapel.addEventListener("click", () => {
            var eleccionUsuario = "papel";
            jugar(eleccionUsuario)
        });
    }

    if(btnTijera){
        btnTijera.addEventListener("click", () => {
            var eleccionUsuario = "tijera";
            jugar(eleccionUsuario)
        });
    }

    if(btnLargto){
        btnLargto.addEventListener("click", () => {
            var eleccionUsuario = "lagarto";
            jugar(eleccionUsuario)
        });
    }

    if(btnSpock){
        btnSpock.addEventListener("click", () => {
            var eleccionUsuario = "spock";
            jugar(eleccionUsuario)
        });
    }
        
});