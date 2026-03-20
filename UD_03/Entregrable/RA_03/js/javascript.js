const tu = document.getElementById("tu");
const icono_tu = document.getElementById("icono_tu");

const cpu = document.getElementById("cpu");
const icono_cpu = document.getElementById("icono_cpu");

const titulo_resultado = document.getElementById("titulo_resultado");
const contador_Victorias = document.getElementById("contador_Victorias");
const contador_Derrotas = document.getElementById("contador_Derrotas");
const contador_Empates = document.getElementById("contador_Empates");

const btnReiniciar = document.getElementById("reiniciar");
const btnReglas = document.getElementById("reglas");

document.addEventListener("DOMContentLoaded", () => {

    var victorias = 0;
    var empates = 0;
    var derrotas = 0;

    inicializarJuego();

    /**
    * @brief Inicializa el juego configurando los elementos, estados y eventos necesarios.
    *
    * Esta función prepara todo lo necesario para que el juego pueda comenzar,
    * incluyendo la configuración de la interfaz, los valores iniciales de los
    * jugadores y la vinculación de eventos a los controles.
    *
    * @return {void} No devuelve ningún valor.
    */
    function inicializarJuego()
    {
        const btnPiedra = document.getElementById("piedra");
        const btnPapel = document.getElementById("papel");
        const btnTijera = document.getElementById("tijera");
        const btnLargto = document.getElementById("lagarto");
        const btnSpock = document.getElementById("spock");

        

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

        if(btnReiniciar)
            btnReiniciar.addEventListener("click", () => {
                resetearJuego();
            });

        if(btnReglas)
            btnReglas.addEventListener("click", () => {
                mostrarReglas();
            });

        setTimeout(() => 
        {
            const contenedor = document.querySelector('main');
            if (contenedor) contenedor.style.opacity = '1';
        }, 100);

        inicializarToolstips();
    }

    /**
    * @brief Muestra la elección de un jugador (jugador humano o CPU) en un display con icono y texto.
    *
    * Esta función limpia el contenido del display, aplica la clase
    * para animación/estilo y agrega los elementos que representan
    * la jugada seleccionada (emoji y texto) del jugador indicado.
    *
    * @param {HTMLElement} display - El contenedor donde se mostrará la elección.
    * @param {string} eleccion - La clave de la elección (por ejemplo: "piedra", "papel", "tijera"...).
    * @param {string} jugador - Nombre del jugador que realizó la elección (por ejemplo: "JUGADOR" o "CPU").
    * @return {void} No devuelve ningún valor.
    */
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

    /**
    * @brief Ejecuta una ronda del juego con la elección del usuario.
    *
    * Esta función realiza los siguientes pasos:
    * 1. Reinicia los displays del juego.
    * 2. Genera la elección de la CPU de forma aleatoria.
    * 3. Muestra la elección del usuario y de la CPU con animaciones.
    * 4. Calcula el resultado de la ronda.
    * 5. Muestra el resultado y actualiza los contadores correspondientes.
    *
    * @param {string} eleccionUsuario - La elección realizada por el usuario (por ejemplo: "piedra", "papel", "tijera"...).
    * @return {void} No devuelve ningún valor.
    */
    function jugar(eleccionUsuario)
    {
        try
        {
            reiniciarDisplays();

            var dysplay = "block"
            mostrarEleccion(dysplay, eleccionUsuario, "Usuario");

            setTimeout(function()
            {
                try
                {
                    var eleccionCPU = obtenerEleccionCPU();
                    mostrarEleccion(dysplay, eleccionCPU, "CPU");

                    var resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);
                    mostrarResultadoJugada(resultado, eleccionUsuario, eleccionCPU);
                } catch(errorCPU)
                {
                    console.error("Error al calcular la opcion de la CPU:", errorCPU.message);
                }
            }, 500);
        } catch(error)
        {
            console.error("Error en la funcion jugar:", error.message);
        }
    }

    /**
    * @brief Genera aleatoriamente la elección de la CPU.
    *
    * Esta función selecciona una opción al azar entre las disponibles y la devuelve.
    *
    * @return {string} La elección de la CPU (por ejemplo: "piedra", "papel" o "tijera"...).
    */
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

    /**
    * @brief Calcula el resultado de una ronda entre el usuario y la CPU.
    *
    * Esta función compara la elección del usuario con la elección de la CPU
    * y determina si la ronda termina en victoria, derrota o empate según
    * las reglas del juego.
    *
    * @param {string} usuario - La elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
    * @param {string} cpu - La elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
    * @return {string} El resultado de la ronda: "victoria", "derrota" o "empate".
    */
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

    /**
    * @brief Reinicia los displays del juego a su estado inicial.
    *
    * Esta función restablece el contenido de los displays del usuario y de la CPU,
    * elimina cualquier clase de animación activa y restablece el mensaje de resultado
    * al texto predeterminado "¡Batalla!".
    *
    * @return {void} No devuelve ningún valor.
    */
    function reiniciarDisplays()
    {
        titulo_resultado.classList.remove("ganador");
        titulo_resultado.classList.remove("perdedor");
        titulo_resultado.classList.remove("empate");
        titulo_resultado.classList.add("mensaje-resultado");

        titulo_resultado.textContent = `¡Batalla!`;

        tu.classList.remove("texto-jugada");
        tu.classList.add("placeholder");

        icono_tu.classList.remove("icono-jugada-grande");
        icono_tu.classList.add("placeholder");
        
        icono_tu.textContent = ``;
        tu.textContent = `?`;

        cpu.classList.remove("texto-jugada");
        cpu.classList.add("placeholder");

        icono_cpu.classList.remove("icono-jugada-grande");
        icono_cpu.classList.add("placeholder");
        
        icono_cpu.textContent = ``;
        cpu.textContent = `?`;
    }

    /**
    * @brief Muestra el resultado de una ronda en la interfaz del juego.
    *
    * Esta función actualiza el mensaje de resultado según si el usuario ganó,
    * perdió o empató, aplica la clase correspondiente para estilos y
    * actualiza los contadores de victorias, derrotas o empates.
    *
    * @param {string} resultado - Resultado de la ronda: "victoria", "derrota" o "empate".
    * @param {string} usuario - Elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
    * @param {string} cpu - Elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
    * @return {void} No devuelve ningún valor.
    */
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
    
    /**
    * @brief Actualiza los contadores de victorias, derrotas y empates en la interfaz.
    *
    * Esta función refleja los valores actuales de las variables globales
    * `victorias`, `derrotas` y `empates` en los elementos del DOM correspondientes.
    *
    * @return {void} No devuelve ningún valor.
    */
    function actualizarContadores()
    {
        contador_Victorias.textContent = `${victorias}`;
        contador_Empates.textContent = `${empates}`;
        contador_Derrotas.textContent = `${derrotas}`;
    }

    /**
    * @brief Inicializa los tooltips de los botones de elección.
    *
    * Esta función recorre todos los botones de elección, obtiene la jugada
    * asociada a cada uno y configura el atributo `title` para mostrar
    * un tooltip indicando qué opciones vence esa jugada.
    *
    * @return {void} No devuelve ningún valor.
    */
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

    /**
    * @brief Muestra las reglas completas del juego en la consola.
    *
    * Esta función imprime un resumen de todas las reglas del juego,
    * indicando qué jugada vence a cuáles otras.
    *
    * @return {void} No devuelve ningún valor.
    */
    function mostrarReglas()
    {
        console.log("Reglas del juego:")
        console.log("   Piedra aplasta a Tijera y Lagarto")
        console.log("   Papel cubre a Piedra y desautoriza a Spock:")
        console.log("   Tijera corta a Papel y decapita a Lagarto")
        console.log("   Lagarto envenena a Spock y devora a Papel")
        console.log("   Spock vaporiza a Piedra y rompe a Tijera")
    }
    /**
    * @brief Reinicia el juego a su estado inicial.
    *
    * Esta función realiza las siguientes acciones:
    * - Restablece los contadores de victorias, derrotas y empates a cero.
    * - Reinicia los displays del juego.
    * - Actualiza los contadores en la interfaz.
    * - Muestra un mensaje temporal indicando que el juego ha sido reiniciado.
    *
    * @return {void} No devuelve ningún valor.
    */
    function resetearJuego() {
        empates = 0;
        victorias = 0;
        derrotas = 0;
        reiniciarDisplays();
        actualizarContadores();
        titulo_resultado.textContent = `¡Juego reiniciado!`;
    }

    /**
    * @brief Maneja las pulsaciones de teclas para jugar o reiniciar el juego.
    *
    * Este listener escucha los eventos de teclado (`keydown`) y realiza las siguientes acciones:
    * - Asocia las teclas numéricas '1' a '5' a las elecciones del juego: "piedra", "papel", "tijera", "lagarto" o "spock".
    * - La tecla 'r' reinicia el juego.
    * - La tecla 's' muestra las reglas del juego.
    *
    * @param {KeyboardEvent} event - El evento de pulsación de tecla.
    */
    document.addEventListener('keydown', (event) => 
    {
        const teclas = 
        {
            "1": "piedra",
            "2": "papel",
            "3": "tijera",
            "4": "lagarto",
            "5": "spock"
        };

        if(teclas[event.key])
        {
            jugar(teclas[event.key]);
        }
        else if(event.key === "r")
        {
            resetearJuego();
        }
        else if(event.key === "s")
        {
            mostrarReglas();
        }
    });
});