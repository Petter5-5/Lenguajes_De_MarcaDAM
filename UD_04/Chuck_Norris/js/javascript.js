document.addEventListener("DOMContentLoaded", () => {
    obtenerCategorias()

    /**
    * @brief Devuelve un mensaje de error aleatorio al estilo Chuck Norris.
    *
    * @return {string} Un mensaje de error aleatorio.
    */
    function obtenerErrorAleatorio() {  
        const errores = [
            "Error al obtener los datos. Chuck Norris los obtuvo primero.",
            "No se pudieron cargar los datos. Chuck Norris estaba cerca.",
            "El servidor falló antes de que Chuck Norris terminara su movimiento",
            "Algo salió mal. Chuck Norris no aprobó esta petición.",
            "Conexión perdida. Chuck Norris desconectó el servidor.",
            "No hay respuesta del servidor. Chuck Norris lo dejó inconsciente.",
            "Los datos existen, pero Chuck Norris decidió no compartirlos.",
            "No se pudieron obtener los datos. El servidor entró en pánico por Chuck Norris.",
            "Estamos trabajando en el problema... antes de que Chuck Norris vuelva.",
            "Chuck Norris interrumpió la carga de datos.",
            "El servidor no sobrevivió a Chuck Norris.",
            "Chuck Norris dice “no” a esta petición.",
            "Error: Chuck Norris.",
            "Chuck Norris estuvo aquí.",
            "El servidor se rindió ante Chuck Norris.",
            "Error al obtener los datos. Chuck Norris los redondeó hacia abajo.",
            "El servidor intentó responder... pero Chuck Norris lo miró fijamente.",
            "Datos no disponibles. Chuck Norris los está usando ahora mismo.",
            "La petición falló. Chuck Norris ganó esta ronda.",
            "No se pudieron cargar los datos. Chuck Norris cerró la conexión de una patada voladora.",
            "Timeout agotado. Chuck Norris nunca espera.",
            "El servidor se escondió cuando oyó el nombre de Chuck Norris.",
            "Error de red. Chuck Norris rompió el protocolo.",
            "Los datos se negaron a venir. Saben quién es Chuck Norris.",
            "El servidor respondió con miedo. Chuck Norris respondió con silencio.",
            "Petición rechazada. Chuck Norris ya aprobó otra.",
            "Error desconocido. Chuck Norris lo conoce.",
            "El servidor cayó. Chuck Norris ni siquiera tocó el teclado"
        ];

        var indice  = Math.floor((Math.random() * errores.length));
        return errores[indice];
    } 
    /**
    * @brief Obtiene las categorías de chistes desde su endpoint correspondiente.
    *
    * Esta función realiza una petición fetch al endpoint de las categorías de chistes,
    * valida la respuesta y actualiza un elemento <select> con las categorías obtenidas.
    * Además, habilita o deshabilita botones de la interfaz dependiendo del resultado.
    *
    * @see obtenerErrorAleatorio
    */
    function obtenerCategorias() {
        const seleccionar = document.getElementById("seleccionar");
        const btnChiste = document.getElementById("btnChiste");
        const btnAleatorio = document.getElementById("btnAleatorio");
        const btnCopiar = document.getElementById("btnCopiar");

        fetch("https://api.chucknorris.io/jokes/categories")
            .then(respuesta => {
             
                if(!respuesta.ok)
                {
                    throw new Error(obtenerErrorAleatorio());
                }

                return respuesta.json();
            })
            .then(seleccionar => {
                seleccionarCategoria.innerHTML = "";

                seleccionar.forEach(cat => {
                    const opcion = document.getElementById("opcion");

                    opcion.value = cat;
                    opcion.textContent = cat;

                    seleccionarCategoria.appendChild(opcion);
                });

                btnChiste.disable = false;
                btnAleatorio.disable = false;
            })
            .catch(error => {

                console.error(error);

                seleccionarCategoria.innerHTML = "<option>Cargando categorias...</option>"

                btnChiste.disable = true;
                btnAleatorio.disable = true;
                btnCopiar.disable = true;

                alert(error.message);
            })
    }
});