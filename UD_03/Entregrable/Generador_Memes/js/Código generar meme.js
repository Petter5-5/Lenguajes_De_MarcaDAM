if (!imagenBase.src) {
    alert("Primero selecciona una imagen.");
}
else {
    const lienzo_crear_imagen = document.createElement("canvas");           // Crea el "lienzo" para dibujar la imagen del meme resultado
    const contexto_grafico_canvas = lienzo_crear_imagen.getContext("2d");   // Indica que la imagen es una imagen 2D
    const imagen_meme_final = new Image();
    imagen_meme_final.src = imagenBase.src;

    imagen_meme_final.onload = async () => {

        lienzo_crear_imagen.width = imagen_meme_final.width;                // Ancho de la imagen del meme
        lienzo_crear_imagen.height = imagen_meme_final.height;              // Alto de la imagen del meme

        contexto_grafico_canvas.drawImage(imagen_meme_final, 0, 0);         // Crea la imagen del meme siendo igual que la imagen origen

        /**
         * @brief Calcula cuántas líneas ocupará un texto al ajustarse a un ancho máximo.
         *
         * Esta función simula el comportamiento del ajuste automático de líneas que realiza CSS en HTML, dividiendo el texto en palabras y comprobando mediante `measureText` cuándo se supera el ancho máximo permitido.
         * No dibuja nada en el canvas, únicamente realiza el cálculo necesario para posicionar correctamente el texto (especialmente el texto inferior).
         *
         * @param {CanvasRenderingContext2D} contexto  Contexto gráfico del canvas.
         * @param {string} texto                       Texto que se desea medir.
         * @param {number} maxWidth                    Ancho máximo disponible para el texto.
         *
         * @return {number} Número total de líneas que ocupará el texto.
         */
        function calcularLineas(contexto, texto, maxWidth) {
            const palabras = texto.split(" ");
            let linea = "";
            let lineas = 1;

            for (let palabra of palabras) {
                const prueba = linea + palabra + " ";
                if (contexto.measureText(prueba).width > maxWidth && linea !== "") {
                    lineas++;
                    linea = palabra + " ";
                } else {
                    linea = prueba;
                }
            }

            return lineas;
        }

        /**
         * @brief Dibuja un texto en el canvas dividiéndolo automáticamente en varias líneas.
         *
         * El texto se ajusta al ancho máximo indicado, reproduciendo el comportamiento del salto de línea automático que aplica CSS en un contenedor HTML.
         * Cada línea se dibuja de forma manual usando `fillText`, separándolas según la altura de línea indicada.
         *
         * @param {CanvasRenderingContext2D} contexto  Contexto gráfico del canvas.
         * @param {string} texto                       Texto que se desea dibujar.
         * @param {number} x                           Coordenada X donde se centrará el texto.
         * @param {number} y                           Coordenada Y inicial para la primera línea.
         * @param {number} maxWidth                    Ancho máximo disponible para el texto.
         * @param {number} lineHeight                  Altura de cada línea de texto.
         */
        function dibujarTextoMultilinea(contexto, texto, x, y, maxWidth, lineHeight) {
            const palabras = texto.split(" ");
            let linea = "";

            let offsetY = 0;

            for (let palabra of palabras) {
                const prueba = linea + palabra + " ";
                if (contexto.measureText(prueba).width > maxWidth && linea !== "") {
                    contexto.fillText(linea.trim(), x, y + offsetY);
                    offsetY += lineHeight;
                    linea = palabra + " ";
                } else {
                    linea = prueba;
                }
            }

            // Última línea del texto
            contexto.fillText(linea.trim(), x, y + offsetY);
        }

        /**
         * @brief Dibuja un texto en el canvas copiando exactamente los estilos del DOM.
         *
         * Esta función obtiene los estilos CSS reales del elemento HTML que representa la vista previa del texto del meme y los aplica al contexto del canvas, garantizando que la imagen generada sea visualmente idéntica a la preview.
         *
         * Además, implementa manualmente:
         *  - Ajuste automático de líneas (multilínea)
         *  - Posicionamiento superior o inferior
         *  - Simulación del efecto `text-shadow` del CSS
         *
         * @param {HTMLElement} elementoTexto  Elemento HTML que contiene el texto del meme.
         * @param {string} posicion            Posición vertical del texto ("top" o "bottom").
         */
        function dibujarTextoDelMeme(elementoTexto, posicion) {
            const estilos = getComputedStyle(elementoTexto);

            const fontSize = parseFloat(estilos.fontSize);
            const fontFamily = estilos.fontFamily;
            const fontWeight = estilos.fontWeight;
            const color = estilos.color;

            const texto = elementoTexto.textContent.toUpperCase();

            contexto_grafico_canvas.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            contexto_grafico_canvas.textAlign = "center";
            contexto_grafico_canvas.textBaseline = "top";
            contexto_grafico_canvas.fillStyle = color;

            // Simulo el efecto text-shadow del texto
            contexto_grafico_canvas.shadowColor = "black";
            contexto_grafico_canvas.shadowOffsetX = 4;
            contexto_grafico_canvas.shadowOffsetY = 4;
            contexto_grafico_canvas.shadowBlur = 7;

            const maxWidth = lienzo_crear_imagen.width * 0.9;
            const lineHeight = fontSize * 1.2;

            let y;

            if (posicion === "top") {
                y = 10;
            } else {
                const numLineas = calcularLineas(contexto_grafico_canvas, texto, maxWidth);
                y = lienzo_crear_imagen.height - (numLineas * lineHeight) - 10;
            }

            dibujarTextoMultilinea(contexto_grafico_canvas, texto, lienzo_crear_imagen.width / 2, y, maxWidth, lineHeight);

            // "Limpio" la sombra del texto
            contexto_grafico_canvas.shadowColor = "transparent";
        }

        // Dibujo el texto de arriba del meme
        dibujarTextoDelMeme(vistaTextoSuperior, "top");
        // Dibujo el texto de abajo del meme
        dibujarTextoDelMeme(vistaTextoInferior, "bottom");

        // Descarga del meme creado
        try {
            // Primero compruebo si el navegador soporta elegir ubicación de guardado
            if (window.showSaveFilePicker) {
                const archivo = await window.showSaveFilePicker({
                    suggestedName: "meme.png",
                    types: [
                        {
                            description: "Imagen PNG",
                            accept: { "image/png": [".png"] }
                        }
                    ]
                });

                /*
                    Aquí necesitamos usar un Promise.
                    Un Promise en JavaScript es un objeto que representa la finalización (o fallo) eventual de una operación asíncrona y su valor resultante.
                    Básicamente, permite manejar códigos que tardan en completarse (como cargar imágenes, leer archivos, llamadas a APIs, etc.) de forma ordenada sin bloquear el hilo principal.
                    Lo necesitamos porque generamos un Blob (fichero imagen) a partir del canvas, pero no devolvemos de forma inmediatamente el resultado, ya que tiene que procesarse y crearse.
                    Para poder esperar correctamente usamos await.
                */

                const writable = await archivo.createWritable();    // Creo un flujo de escritura para guardar el archivo elegido por el usuario
                // Aquí tenemos la variable todo_ok, que es la variable que "cumple la promesa" y entrega el resultado de la operación asíncrona. Es decir, la que indica que si todo ha ido bien
                const blob = await new Promise((todo_ok, fallo) => lienzo_crear_imagen.toBlob(todo_ok, "image/png"));    // Convierto el contenido del canvas en un archivo Blob en formato PNG
                await writable.write(blob); // Escribo el Blob (la imagen generada) dentro del archivo seleccionado
                await writable.close();     // Cierro el archivo y finaliza la operación de guardado
            }
            // Si NO soporta showSaveFilePicker (Firefox, Safari)
            else {
                const enlace = document.createElement("a");                 // Creo dinámicamente un enlace <a> en el documento
                enlace.href = lienzo_crear_imagen.toDataURL("image/png");   // Convierto el contenido del canvas a una URL de imagen en formato PNG y lo asigno al enlace
                enlace.download = "meme.png";                               // Esto indica que al hacer click se descargará un archivo llamado "meme.png"
                enlace.click();                                             // Fuerzo la ejecución del click
            }
        } catch (error) {
            console.log("Guardado cancelado o no soportado:", error);
        }
    };
}