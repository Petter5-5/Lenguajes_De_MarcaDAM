

document.addEventListener("DOMContentLoaded", () => {

    var victorias = 0;
    var empates = 0;
    var derrotas = 0;

    inicializarJuego();

    function inicializarJuego()
    {
        const btnPiedra = document.getElementById("piedra");
        const btnPapel = document.getElementById("papel");
        const btnTijera = document.getElementById("tijera");
        const btnLargto = document.getElementById("lagarto");
        const btnSpock = document.getElementById("spock");

        const tu = document.getElementById("tu");
        const icono_tu = document.getElementById("icono_tu");

        const cpu = document.getElementById("cpu");
        const icono_cpu = document.getElementById("icono_cpu");

        const titulo_resultado = document.getElementById("titulo_resultado");
        const contador_Victorias = document.getElementById("contador_Victorias");
        const contador_Derrotas = document.getElementById("contador_Derrotas");
        const contador_Empates = document.getElementById("contador_Empates");

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

        setTimeout(() => 
        {
            const contenedor = document.querySelector('main');
            if (contenedor) contenedor.style.opacity = '1';
        }, 100);

        inicializarToolstips();
    }

    function mostrarEleccion(display, eleccion, jugador)
    {
        if(jugador == "Usuario")
        {
            switch(eleccion)
            {
                case "piedra":
                    tu.style.display = display;
                    tu.classList.remove("placeholder");
                    tu.classList.add("texto-jugada");

                    icono_tu.classList.remove("placeholder");
                    icono_tu.classList.add("icono-jugada-grande");

                    icono_tu.textContent = `🪨`
                    tu.textContent = `Piedra`;
                    break;
                case "papel":
                    tu.style.display = display;
                    tu.classList.remove("placeholder");
                    tu.classList.add("texto-jugada");

                    icono_tu.classList.remove("placeholder");
                    icono_tu.classList.add("icono-jugada-grande");

                    icono_tu.textContent = `📄`
                    tu.textContent = `Papel`;
                    break;
                case "tijera":
                    tu.style.display = display;
                    tu.classList.remove("placeholder");
                    tu.classList.add("texto-jugada");

                    icono_tu.classList.remove("placeholder");
                    icono_tu.classList.add("icono-jugada-grande");

                    icono_tu.textContent = `✂️`
                    tu.textContent = `Tijera`;
                    break;
                case "lagarto":
                    tu.style.display = display;
                    tu.classList.remove("placeholder");
                    tu.classList.add("texto-jugada");

                    icono_tu.classList.remove("placeholder");
                    icono_tu.classList.add("icono-jugada-grande");

                    icono_tu.textContent = `🦎`
                    tu.textContent = `Lagarto`;
                    break;
                case "spock":
                    tu.style.display = display;
                    tu.classList.remove("placeholder");
                    tu.classList.add("texto-jugada");

                    icono_tu.classList.remove("placeholder");
                    icono_tu.classList.add("icono-jugada-grande");

                    icono_tu.textContent = `🖖`
                    tu.textContent = `Spock`;
                    break;
                default:
                    tu.style.display = "none";
                    tu.classList.remove("texto-jugada");
                    tu.classList.add("placeholder");

                    icono_tu.classList.remove("icono-jugada-grande");
                    icono_tu.classList.add("placeholder");

                    icono_tu.textContent = ``;
                    tu.textContent = `?`;
                    break;

            }
        }
        else
        {
            switch(eleccion)
            {
                case "piedra":
                    cpu.style.display = display;
                    cpu.classList.remove("placeholder");
                    cpu.classList.add("texto-jugada");

                    icono_cpu.classList.remove("placeholder");
                    icono_cpu.classList.add("icono-jugada-grande");

                    icono_cpu.textContent = `🪨`
                    cpu.textContent = `Piedra`;
                    break;
                case "papel":
                    cpu.style.display = display;
                    cpu.classList.remove("placeholder");
                    cpu.classList.add("texto-jugada");

                    icono_cpu.classList.remove("placeholder");
                    icono_cpu.classList.add("icono-jugada-grande");

                    icono_cpu.textContent = `📄`
                    cpu.textContent = `Papel`;
                    break;
                case "tijera":
                    cpu.style.display = display;
                    cpu.classList.remove("placeholder");
                    cpu.classList.add("texto-jugada");

                    icono_cpu.classList.remove("placeholder");
                    icono_cpu.classList.add("icono-jugada-grande");

                    icono_cpu.textContent = `✂️`
                    cpu.textContent = `Tijera`;
                    break;
                case "lagarto":
                    cpu.style.display = display;
                    cpu.classList.remove("placeholder");
                    cpu.classList.add("texto-jugada");

                    icono_cpu.classList.remove("placeholder");
                    icono_cpu.classList.add("icono-jugada-grande");

                    icono_cpu.textContent = `🦎`
                    cpu.textContent = `Lagarto`;
                    break;
                case "spock":
                    cpu.style.display = display;
                    cpu.classList.remove("placeholder");
                    cpu.classList.add("texto-jugada");

                    icono_cpu.classList.remove("placeholder");
                    icono_cpu.classList.add("icono-jugada-grande");

                    icono_cpu.textContent = `🖖`
                    cpu.textContent = `Spock`;
                    break;
                default:
                    cpu.style.display = "none";
                    cpu.classList.remove("texto-jugada");
                    cpu.classList.add("placeholder");

                    icono_cpu.classList.remove("icono-jugada-grande");
                    icono_cpu.classList.add("placeholder");

                    icono_cpu.textContent = ``;
                    cpu.textContent = `?`;
                    break;
            }
        }
    }

    function jugar(eleccionUsuario)
    {
        reiniciarDisplays();

        var dysplay = "block"
        mostrarEleccion(dysplay, eleccionUsuario, "Usuario");

        setTimeout(function()
        {
            var eleccionCPU = obtenerEleccionCPU();
            mostrarEleccion(dysplay, eleccionCPU, "CPU");

            var resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);
            mostrarResultadoJugada(resultado, eleccionUsuario, eleccionCPU);
        }, 600);
        
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

    function reiniciarDisplays()
    {
        titulo_resultado.classList.remove("ganador");
        titulo_resultado.classList.remove("perdedor");
        titulo_resultado.classList.remove("empate");
        titulo_resultado.classList.add("mensaje-resultado");

        titulo_resultado.textContent = `¡Batalla!`;


        cpu.classList.remove("texto-jugada");
        cpu.classList.add("placeholder");

        icono_cpu.classList.remove("icono-jugada-grande");
        icono_cpu.classList.add("placeholder");
        
        icono_cpu.textContent = ``;
        cpu.textContent = `?`;
    }

    function mostrarResultadoJugada(resultado, usuario, cpu)
    {
        switch(resultado)
        {
            case "VICTORIA":
                switch(usuario)
                {
                    case "piedra":
                        if(cpu == "lagarto")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Piedra vence a Papel`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Piedra vence a Tijera`;
                        }
                        break;
                    case "papel":
                        if(cpu == "piedra")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Papel vence a Piedra`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Papel vence a Spock`;
                        }
                        break;
                    case "tijera":
                        if(cpu == "lagarto")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Tijera vence a Lagarto`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Tijera vence a Papel`;
                        }
                        break;
                    case "lagarto":
                        if(cpu == "spock")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Lagarto vence a Spock`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Lagarto vence a Papel`;
                        }
                        break;
                    case "spock":
                        if(cpu == "tijera")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Spock vence a Tijera`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("ganador");
                            titulo_resultado.textContent = `¡Ganastes! Spock vence a Piedra`;
                        }
                        break;
                }
                victorias++;
                actualizarContadores();
                break;

            case "DERROTA":
                switch(usuario)
                {
                    case "piedra":
                        if(cpu == "papel")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Papel vence a Piedra`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Spock vence a Piedra`;
                        }
                        break;
                    case "lagarto":
                        if(cpu == "tijera")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Tijera vence a Lagarto`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Piedra vence a Lagarto`;
                        }
                        break;
                    case "spock":
                        if(cpu == "papel")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Papel vence a Spock`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Lagarto vence a Spock`;
                        }
                        break;
                    case "tijera":
                        if(cpu == "piedra")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Piedra vence a Tijera`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Spock vence a Tijera`;
                        }
                        break;
                    case "papel":
                        if(cpu == "tijera")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Tijera vence a Papel`;
                        }
                        else
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("perdedor");
                            titulo_resultado.textContent = `¡Perdistes! Spock vence a Papel`;
                        }
                        break;
                }
                derrotas++
                actualizarContadores();
                break;
            
            case "EMPATE":
                switch(usuario)
                {
                    case "papel":
                        if(cpu == "papel")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("empate");
                            titulo_resultado.textContent = `¡Empate! Ambos habéis elegido Papel`;
                        }
                    break;
                    case "piedra":
                        if(cpu == "piedra")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("empate");
                            titulo_resultado.textContent = `¡Empate! Ambos habéis elegido Piedra`;
                        }
                    break;
                    case "lagarto":
                        if(cpu == "lagarto")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("empate");
                            titulo_resultado.textContent = `¡Empate! Ambos habéis elegido Lagarto`;
                        }
                    break;
                    case "spock":
                        if(cpu == "spock")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("empate");
                            titulo_resultado.textContent = `¡Empate! Ambos habéis elegido Spock`;
                        }
                    break;
                    case "tijera":
                        if(cpu == "tijera")
                        {
                            titulo_resultado.classList.remove("mensaje-resultado");
                            titulo_resultado.classList.add("empate");
                            titulo_resultado.textContent = `¡Empate! Ambos habéis elegido Tijera`;
                        }
                    break;
                }
                empates++;
                actualizarContadores();
                break;
        }
    }

    function actualizarContadores()
    {
        contador_Victorias.textContent = `${victorias}`;
        contador_Empates.textContent = `${empates}`;
        contador_Derrotas.textContent = `${derrotas}`;
    }

    function inicializarToolstips()
    {
        const btnPiedra = document.getElementById("piedra");
        const btnPapel = document.getElementById("papel");
        const btnTijera = document.getElementById("tijera");
        const btnLargto = document.getElementById("lagarto");
        const btnSpock = document.getElementById("spock");

        btnPiedra.title = "Piedra vence a: Tijera y Lagarto";
        btnPapel.title = "Papel vence a: Piedra y Spock";
        btnTijera.title = "Tijera vence a: Papel y Lagarto";
        btnLargto.title = "Lagarto vence a: Papel y Spock";
        btnSpock.title = "Spock vence a: Piedra y Tijera";
    }

});