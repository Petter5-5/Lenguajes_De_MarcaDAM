
/** @brief Endpoint default de la API para poder construir luego url*/
const ENDPOINT_BASE = "https://apis.codante.io/olympic-games"; 
/** @brief Endpoint del medallero, devuelve paises ordenados por medallas*/
const ENDPOINT_MEDALLERO = "https://apis.codante.io/olympic-games/countries";
/** @brief Endpoint de disciplinas, devuelve la lista de deportes olimpicos*/
const ENDPOINT_DISCIPLINA = "https://apis.codante.io/olympic-games/disciplines";

/**@brief Página actual que donde se están mostrando los eventos*/
var pagina_actual = 1;
/**@brief Número de páginas*/
var total_paginas = 3;
/**@brief Filtro de la API para los paises por 3 letras USA*/
var filtro_pais = "";
/**@brief Filtro de la API para los tipos de disciplina*/
var filtro_disciplina = "";
/**@brief Filtro de la API para las fechas*/
var filtro_fecha = "";
/**@brief Filtro para medallero permitiendome filtrar paises sin tener que llamar a ala API*/
var todos_los_paises = [];

document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("contenedor_eventos"))
    {
        inicializar_botones();
        cargar_disciplinas();
        cargar_eventos();
    }

    if(document.getElementById("cuerpo_tabla"))
    {
        cargar_medallero();
        inicializar_botones_medallero();
    }

    /**
     * @brief Inicializa botones y las constantes necesaria para el index.hmtl
     * @details Revisa que los botoenes existan y permite usar las funciones
     *          para el index.html
     */
    function inicializar_botones()
    {
        const btn_buscar = document.getElementById("btn_buscar");
        const btn_reset = document.getElementById("btn_reset");
        const btn_anterior = document.getElementById("btn_anterior");
        const btn_siguiente = document.getElementById("btn_siguiente");
        const btn_reintentar = document.getElementById("btn_reintentar");

        if(btn_buscar)
                btn_buscar.addEventListener("click", () => {
                    aplicar_filtros();
            });
        if(btn_reset)
                btn_reset.addEventListener("click", () => {
                    limpiar_filtros();
            });
        if(btn_anterior)
                btn_anterior.addEventListener("click", () => {
                    if(pagina_actual > 1)
                    {
                        pagina_actual--;
                        cargar_eventos();
                    }
            });
        if(btn_siguiente)
                btn_siguiente.addEventListener("click", () => {
                    if(pagina_actual < total_paginas)
                    {
                        pagina_actual++;
                        cargar_eventos();
                    }
            });
        if(btn_reintentar)
                btn_reintentar.addEventListener("click", () => {
                    cargar_eventos();
            });
    }
    /**
     * @brief Carga la lista de disciplinas de la API para poder rellenar el select
     * @details Llama a la URL de disciplina con el fetch y carga todas las diciplinas
     *          creando el elemnto option con su id, value y el nombre visible
     */
    function cargar_disciplinas()
    {
        fetch(ENDPOINT_DISCIPLINA)

            .then(function (respuesta){
                if(!respuesta.ok)
                {
                    throw new Error("Error: " + respuesta.status);
                }
                return respuesta.json();
            })

            .then(function (datos) {
                    var select = document.getElementById("filtro_disciplina");

                    datos.data.forEach(function (disciplina){
                            var opcion = document.createElement("option");
                            opcion.value = disciplina.id;
                            opcion.textContent = disciplina.name;
                            select.appendChild(opcion);

                    });

            })

            .catch(function (error){
                console.warn("No se cargaron las disciplinas: ", error);

            });
    }
    /**
     * @brief Contruye la URL de los enpoints para los eventos con el filtro
     * @details Usamos URLSearchParams para poner solo los filtros que tiene un valor
     *          y incluye el número página actual
     * @returns {string} Nos devuelve la URL completa para luego usarla en un fetcht al pedirselo
     */
    function construir_url()
    {
        var params = new URLSearchParams();
        params.append("page", pagina_actual);

        if(filtro_pais !== "")
        {
            params.append("country", filtro_pais.toUpperCase());
        }
        if(filtro_disciplina !== "")
        {
            params.append("discipline", filtro_disciplina);
        }
        if(filtro_fecha !== "")
        {
            params.append("date", filtro_fecha);
        }

        return ENDPOINT_BASE + "/events?" + params.toString();
    }
    /**
     * @brief Carga la lista de la API para después proyectarla
     * @details primero limpiamos el cotenedor antes de cargarlo,
     *          segundo, actualizamos el texto de estado y la pagina con los daots
     *          de respuesta.meta y por último muestra un mensaje de error si la 
     *          petición falla.
     */
    function cargar_eventos()
    {
        document.getElementById("texto_estado").textContent = `Cargando...`;
        document.getElementById("mensaje_error").style.display = "none";
        document.getElementById("contenedor_eventos").innerHTML = "";

        fetch(construir_url())

        .then(function(respuesta){
            if(!respuesta.ok)
            {
                throw new Error("Error HTTP: " + respuesta.status);
            }
            return respuesta.json();
        })

        .then(function (datos){
            total_paginas = datos.meta.last_page;
            pagina_actual = datos.meta.current_page;

            document.getElementById("texto_estado").textContent = datos.meta.total + " eventos encontrados.";

            actualizar_pagina();
            mostrar_eventos(datos.data);
        })

        .catch(function (error){
            console.error("Error al cargar eventos: ", error);
            document.getElementById("mensaje_error").style.display = "block";
        });
    }
    /**
     * @brief Recorre el array de eventos y creamos las tarjetas por cada uno de los eventos
     * @details Si el array está vacio mostramos que no se a encontrado ningún evento,
     *          solo lo pone al DOM si la tarjeta no devuelve null.
     * @param {Array} lista_eventos un array de objeto de vuelto por la API.
     */
    function mostrar_eventos(lista_eventos)
    {
        var contenedor = document.getElementById("contenedor_eventos");

        if(lista_eventos.length === 0)
        {
            contenedor.innerHTML = "<p>No se encontraron eventos.</p>";
            return;
        }

        lista_eventos.forEach(function (evento){
            var tarjeta = crear_tarjeta(evento);
            if(tarjeta !== null)
            {
                contenedor.appendChild(tarjeta);
            }     
        });
    }
    /**
     * @brief creamos un elemento div como tarjeta
     * @details Usamo un try and catch para que un error de algún evento no
     *          impida crear las otras tarjetas.
     * @param {Object} evento Un objeto devuelto por la API
     * @returns {HTMLElement} devuelve el div que hemos creado o null si hubo algún error.
     */
    function crear_tarjeta(evento)
    {
        try
        {
            var div = document.createElement("div");
            div.className = "tarjeta_evento";

            div.innerHTML = 
            "<h3>" + evento.discipline_name + " - " + evento.event_name + "</h3>" +
            "<p>Lugar: " + evento.venue_name + "</p>" +
            "<p>Fecha: " + evento.day + "</p>" +
            "<p>Estado: <span class='estado'>" + evento.status + "</span></p>";
            
            return div;
        } catch (error) 
        {
            console.error("Error al crear tarjeta: ", error);
            return null;
        }
    }
    /**
     * @brief Actualizaq el estado de los botones y el texto informativo
     * @details Desactivamos el boton anterior si estamos en la primera página o
     *          desactiva el boton siguiente si estamos en la última página
     */
    function actualizar_pagina()
    {
        document.getElementById("btn_anterior").disabled = (pagina_actual <= 1);

        document.getElementById("btn_siguiente").disabled = (pagina_actual >= total_paginas);

        document.getElementById("info_pagina").textContent = "Pagina " + pagina_actual + " de " + total_paginas;
    }
    /**
     * @brief Lee los valores de los filtros y regcarga los eventos desde la página 1
     * @details Guarda los valores en las variables para construir la URL y lo incluye
     *          en la siguiente petición
     */
    function aplicar_filtros()
    {
        filtro_pais = document.getElementById("filtro_pais").value;
        filtro_disciplina = document.getElementById("filtro_disciplina").value;
        filtro_fecha = document.getElementById("filtro_fecha").value;
        pagina_actual = 1;
        cargar_eventos();
    }
    /**
     * @brief Vacia los filtros y recarga los eventos desde la página 1
     * @details limpia los inputs del HTML para construir URL y no incluye los filtros
     *          en la siguiente petición
     */
    function limpiar_filtros()
    {
        document.getElementById("filtro_pais").value = "";
        document.getElementById("filtro_disciplina").value = "";
        document.getElementById("filtro_fecha").value = "";
        filtro_pais = "";
        filtro_disciplina = "";
        filtro_fecha = "";
        pagina_actual = 1;
        cargar_eventos();
    }
    /**
     * @brief Asigna los botones de la página medallero
     * @details Comprueba que los botones existan antes de asignarlos
     */
    function inicializar_botones_medallero()
    {
        var btn_buscar_pais = document.getElementById("btn_buscar_pais");
        var btn_ver_todos = document.getElementById("btn_ver_todos");

        if(btn_buscar_pais)
                btn_buscar_pais.addEventListener("click", () => {
                    filtrar_por_nombre();
            });

        if(btn_ver_todos)
                btn_ver_todos.addEventListener("click", () => {
                    document.getElementById("buscar_pais").value = "";
                    renderizar_tabla(todos_los_paises);
            });
    }
    /**
     * @brief Carga el medallero desde la API
     * @details hacemos fetch a ENDPOINT_MEDALLERO y guarda los datos obtenidos en
     *          todos_los_paises para poder filtrar despues sin volver a llamar a la API.
     */
    function cargar_medallero()
    {
        document.getElementById("texto_estado_medallero").textContent = "Cargando...";

        fetch(ENDPOINT_MEDALLERO)

            .then(function (respuesta){
                if(!respuesta.ok)
                {
                    throw new Error("Error HTTP: " + respuesta.status);
                }
                return respuesta.json();
            })

            .then(function(datos)
            {
                todos_los_paises = datos.data;
                renderizar_tabla(todos_los_paises);
                document.getElementById("texto_estado_medallero").textContent = todos_los_paises.length + ` paises en el medallero.`;
            })
            
            .catch(function (error){
                console.error("Error al cargar medallero", error);
                document.getElementById("mensaje_error_medallero").style.display = "block";
            });
    }
    /**
     * @brief Carga un array de paises como las filas en la tabla medallero
     * @details limpia el cuerpo_tabla antes de insertar nada, si el array está vacio
     *          nos muestra un mensaje para avisarnos, además usamos try and catch por cada fila
     *          para que un error no rompa toda la tabla y muestre los datos
     * @param {Array} lista_paises array de objetos pais con sus medallas
     */
    function renderizar_tabla(lista_paises)
    {
        var cuerpo_tabla = document.getElementById("cuerpo_tabla");
        cuerpo_tabla.innerHTML = "";

        if(lista_paises.length === 0)
        {
            cuerpo_tabla.innerHTML = "<tr><td colspan='6'>No hay resultados.</td></tr>";
            return;
        }

        lista_paises.forEach(function(pais, indice){
            try
            {
                var fila = document.createElement("tr");
                fila.innerHTML =
                    "<td>" + (indice + 1)               + "</td>" +
                    "<td>" + pais.name                  + "</td>" +
                    "<td>" + (pais.gold_medals   || 0)  + "</td>" +
                    "<td>" + (pais.silver_medals || 0)  + "</td>" +
                    "<td>" + (pais.bronze_medals || 0)  + "</td>" +
                    "<td>" + (pais.total_medals  || 0)  + "</td>";
                cuerpo_tabla.appendChild(fila);
            }catch (error)
            {
                console.error("Error al crear fila: ", error);
            }
        });
    }
    /**
     * @brief filtra la tabla del medallero mediante el nombre del país si tener que llamar a la API
     * @details lee el texto de buscar_pais y filtra el array 
     *          todos_los_paises y llama a renderizar_tabla con el resultado
     */
    function filtrar_por_nombre()
    {
        var busqueda = document.getElementById("buscar_pais").value.toLowerCase();

        var filtrados = todos_los_paises.filter(function(pais){
            return pais.name.toLowerCase().indexOf(busqueda) !== -1;
        });

        renderizar_tabla(filtrados)
    }
});