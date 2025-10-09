# Tarea 2 - Desarrollo de Aplicaciones Web
**Autor:** Byron Millán

## Descripción

Este proyecto corresponde a la **Tarea 2** del curso de Desarrollo de Aplicaciones Web.  
Extiende el trabajo realizado en la Tarea 1, implementando ahora la lógica del lado del servidor mediante **Flask (Python)** y **MySQL** para el manejo persistente de los avisos de adopción.

La aplicación permite:
- Agregar nuevos avisos de adopción con validación tanto en **frontend** como en **backend**.
- Guardar los datos en tablas de la base de datos (`aviso_adopcion`, `foto`, `contactar_por`).
- Mostrar los últimos cinco avisos en la portada.
- Visualizar el listado completo con paginación.
- Ver el detalle de cada aviso, incluyendo fotos y medios de contacto.

---

## Estructura del Proyecto

### `flask_app/`
Contiene la aplicación Flask y sus componentes principales.

- `app.py` → Rutas de la aplicación (`/`, `/agregar`, `/listado`, `/info-aviso`, `/estadisticas`).  
- `database/db.py` → Conexión con MySQL y funciones para avisos, fotos, comunas, contactos, etc.  
- `templates/` → Vistas HTML con Jinja2:
  - `index/listado-portada.html` → Portada con los últimos avisos.  
  - `agregar/agregar.html` → Formulario dinámico para agregar un aviso.  
  - `listado/listado.html` → Listado con paginación de los avisos.  
  - `info/informacion.html` → Detalle completo de un aviso.  
  - `estadisticas/estadisticas.html` → Página de estadísticas.  
- `static/`
  - `css/` → Estilos del sitio (`style.css`, `form.css`, `info.css`, `fotos.css`).
  - `js/` → Scripts para comportamiento dinámico del formulario (`validation.js`, `select-region.js`, etc.).
  - `uploads/` → Carpeta donde se almacenan las imágenes subidas por los usuarios.

---

## Decisiones de Diseño y Detalles Técnicos

### Validación Doble
Se mantuvieron las validaciones del **frontend (JS)** de la Tarea 1 y se añadió una **validación en el backend (Flask)** antes de insertar en la base de datos.  
Esto asegura consistencia y evita datos incorrectos si el usuario desactiva JavaScript.

### Manejo de Imágenes
- Las fotos se validan por tipo MIME y extensión antes de guardarse.
- Se almacenan en `static/uploads/`, con nombres únicos generados mediante **SHA256**.
- En la base de datos se guarda la ruta relativa (`uploads/...`) en `ruta_archivo`.

### Paginación
El listado muestra **5 avisos por página**, con botones *“Anterior”* y *“Siguiente”*.  
Se utiliza `LIMIT` y `OFFSET` en las consultas SQL para obtener solo los registros necesarios.

### Diseño de Templates
- Cada vista hereda de una plantilla base (`base.html`) según su módulo.
- Se mantiene coherencia visual con los colores y estilos de la Tarea 1 (tonos verdes y celestes).
