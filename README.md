# Tarea 1 - Desarrollo de Aplicaciones Web
**Autor**: Byron Millán

## Descripción
Este proyecto corresponde a la **Tarea 1** del curso de Desarrollo de Aplicaciones Web.  
El prototipo simula una aplicación básica para publicar y visualizar avisos de adopción de mascotas.

---

## Estructura del Proyecto

- `html/` → Archivos HTML.  
  - `index.html` → Portada del sistema.  
  - `agregar.html` → Formulario para agregar un nuevo aviso de adopción.  
  - `listado.html` → Listado con avisos de adopción inventados.  
  - `informacion.html` → Información de un aviso de adopción en particular.  
  - `estadisticas.html` → Estadísticas sobre los avisos de adopción.  

- `css/` → Archivos de estilos CSS.  
  - `style.css` → Estilo general para el sistema.  
  - `form.css` → Estilo para el formulario.  
  - `info.css` → Estilo para la información de un aviso en particular.  
  - `fotos.css` → Estilo relacionado a las imágenes del aviso.  

- `js/` → Archivos JavaScript.  
  - `region_comuna.js` → Datos de regiones y comunas de Chile.  
  - `select-region.js` → Población dinámica de los menús Región-Comuna.  
  - `select-contact.js` → Manejo de los campos de contacto dinámicos.  
  - `set-date.js` → Prellenado de la fecha de entrega.  
  - `submit-photos.js` → Manejo del input dinámico de fotos.  
  - `validation.js` → Validación completa del formulario y despliegue de errores/confirmación.  
  - `look-photos.js` → Visualización de imágenes del aviso en mayor tamaño. 

---

## Decisiones de Diseño

- **Colores y Estilo**:
  - Se utilizaron colores suaves (celeste y verde) para botones.  
  - Botones con sombra y efecto hover para mejorar visibilidad.  

- **Validaciones Visuales**:
  - Los campos requeridos del formulario resaltan en un gris oscuro.  
  - Se muestran los campos inválidos en un cuadro de error en la parte superior.

- **Tablas y Layout**:
  - Las tablas están centradas para mejor presentación.
  