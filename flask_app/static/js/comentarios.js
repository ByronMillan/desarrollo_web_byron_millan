const validarNombre = (nombre) => {
    return nombre && nombre.trim().length >= 3 && nombre.trim().length <= 80;
};

const validarComentario = (comentario) => {
    return comentario && comentario.trim().length >= 5 && comentario.trim().length <= 200;
};

const mostrarMensaje = (mensaje, errores = [], esError = false) => {
    const valBox = document.getElementById("val-box-c");
    const valMsg = document.getElementById("val-msg-c");
    const valList = document.getElementById("val-list-c");

    valMsg.textContent = mensaje;
    valList.innerHTML = "";

    errores.forEach((e) => {
        const li = document.createElement("li");
        li.textContent = e;
        valList.appendChild(li);
    });

    valBox.style.backgroundColor = esError ? "#ffdddd" : "#ddffdd";
    valBox.style.borderLeftColor = esError ? "#f44336" : "#4CAF50";
    valBox.hidden = false;
};

async function cargarComentarios() {
    const aviso_id = document.getElementById("aviso-id").value;

    try {
        const response = await fetch(`/get-comentarios/${aviso_id}`);

        if (!response.ok) {
            throw new Error("Error al obtener los comentarios desde el servidor.");
        }

        const comentarios = await response.json();
        
        const contenedor = document.getElementById("com-list");
        contenedor.innerHTML = "";
        
        if (!comentarios || comentarios.length == 0) {
            contenedor.innerHTML = `<p id="no-coms">Aún no hay comentarios para este aviso.</p>`;
            return;
        }

        comentarios.forEach((com) => {
            const div = document.createElement("div");
            div.classList.add("com-container");

            const fecha = new Date(com.fecha);
            fecha.setHours(fecha.getHours() + 3);
            const fechaLocal = fecha.toLocaleString();

            div.innerHTML = `
                <p class="com-date">${fechaLocal}</p>
                <p class="com-name">${com.nombre}</p>
                <p class="com-contenido">${com.texto}</p>
            `;

            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
        const contenedor = document.getElementById("com-list");
        contenedor.innerHTML = `<p style="color: red;">Error al cargar los comentarios. Intente nuevamente más tarde.</p>`;
    }
}

async function agregarComentario() {
    const nombre = document.getElementById("com-name").value.trim();
    const comentario = document.getElementById("com-text-area").value.trim();
    const aviso_id = document.getElementById("aviso-id").value;

    let errores = [];

    if (!validarNombre(nombre)) {
        errores.push("Nombre (mínimo 3, máximo 80 caracteres)");
    }

    if (!validarComentario(comentario)) {
        errores.push("Comentario (mínimo 5, máximo 200 caracteres)");
    }
    
    if (errores.length > 0) {
        mostrarMensaje("Los siguientes campos son inválidos:", errores, true);
        return;
    }
    
    try {
        const response = await fetch("/agregar-comentario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                aviso_id: aviso_id,
                nombre: nombre,
                contenido: comentario,
            }),
        });

        const data = await response.json()

        if (response.ok) {
            mostrarMensaje("Comentario agregado correctamente.");
            document.getElementById("com-form").reset();
            cargarComentarios();
        } else {
            mostrarMensaje(`Error: ${data.error || "No se pudo agregar el comentario."}`, [], true);
        }
    } catch (error) {
        mostrarMensaje("Error al enviar el comentario.", [], true);
        console.error("Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit-com-btn").addEventListener("click", agregarComentario);
  cargarComentarios();
});
