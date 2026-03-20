

const ENDPOINT_BASE = "https://apis.codante.io/olympic-games"; 
const ENDPOINT_MEDALLERO = "https://apis.codante.io/olympic-games/countries";
const ENDPOINT_DISCIPLINA = "https://apis.codante.io/olympic-games/disciplines";

var pagina_actual = 1;
var total_paginas = 3;

var filtro_pais = "";
var filtro_disciplina = "";
var filtro_fecha = "";

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

    function actualizar_pagina()
    {
        document.getElementById("btn_anterior").disabled = (pagina_actual <= 1);

        document.getElementById("btn_siguiente").disabled = (pagina_actual >= total_paginas);

        document.getElementById("info_pagina").textContent = "Pagina " + pagina_actual + " de " + total_paginas;
    }

    function aplicar_filtros()
    {
        filtro_pais = document.getElementById("filtro_pais").value;
        filtro_disciplina = document.getElementById("filtro_disciplina").value;
        filtro_fecha = document.getElementById("filtro_fecha").value;
        pagina_actual = 1;
        cargar_eventos();
    }

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
                document.getElementById("texto_estado_medallero").textContent = todos_los_paises.length + `paises en el medallero.`;
            })
            
            .catch(function (error){
                console.error("Error al cargar medallero", error);
                document.getElementById("mensaje_error_medallero").style.display = "block";
            });
    }
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
    function filtrar_por_nombre()
    {
        var busqueda = document.getElementById("buscar_pais").value.toLowerCase();

        var filtrados = todos_los_paises.filter(function(pais){
            return pais.name.toLowerCase().indexOf(busqueda) !== -1;
        });

        renderizar_tabla(filtrados)
    }
});