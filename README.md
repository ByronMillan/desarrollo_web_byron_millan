# Tarea 3 - Desarrollo de Aplicaciones Web
**Autor:** Byron Millán

## Descripción

Este proyecto corresponde a la **Tarea 3** del curso de Desarrollo de Aplicaciones Web.  
Extiende el trabajo realizado en la Tarea 3, incorporando nuevas funcionalidades en el lado del cliente y del servidor, centradas en la visualización de estadísticas y la interacción de los usuarios mediante comentarios asincrónicos.

La aplicación ahora permite:
- Visualizar estadísticas dinámicas sobre los avisos de adopción:
  - **Gráfico de líneas**: cantidad de avisos agregados por día.
  - **Gráfico de torta**: distribución de avisos por tipo de mascota (perro o gato).
  - **Gráfico de barras**: cantidad de avisos mensuales separados por tipo de mascota.
- Agregar y visualizar comentarios asociados a cada aviso de adopción.
  - Los comentarios se validan en el frontend y backend.
  - Se insertan en la tabla comentario.
  - Se cargan y actualizan de manera asincrónica usando Fetch API.

---

## Estructura del Proyecto

### `flask_app/`
Contiene la aplicación Flask y sus componentes principales.

- `app.py` → Rutas principales de la aplicación (`/`, `/agregar`, `/listado`, `/info-aviso/<id>`, `/estadisticas`, `/agregar-comentario`, `/get-comentarios/<id>`, `/get-stats-data`).  
- `database/db.py` → Conexión con MySQL y funciones para avisos, fotos, comunas, contactos, etc.  
- `templates/` → Vistas HTML con Jinja2:
  - `index/listado-portada.html` → Portada con los últimos avisos.  
  - `agregar/agregar.html` → Formulario dinámico para agregar un aviso.  
  - `listado/listado.html` → Listado con paginación de los avisos.  
  - `info/informacion.html` → Detalle completo de un aviso.  
  - `estadisticas/estadisticas.html` → Vista con los gráficos generados con Highcharts.
- `static/`
  - `css/` → Estilos del sitio (`style.css`, `form.css`, `info.css`, `fotos.css`).
  - `js/` → Scripts para comportamiento dinámico del formulario (`validation.js`, `select-region.js`, etc.).
  - `uploads/` → Carpeta donde se almacenan las imágenes subidas por los usuarios.

---

## Decisiones de Diseño y Detalles Técnicos

### Estadísticas Dinámicas
- Implementadas con Highcharts y Fetch API.
- Los datos se obtienen desde Flask en formato JSON mediante la ruta /get-stats-data.

### Comentarios Asincrónicos
- Los comentarios se gestionan mediante fetch.
- Se validan los campos “nombre” y “comentario” en el cliente y en el servidor.
- La lista de comentarios se actualiza dinámicamente tras enviar uno nuevo.

