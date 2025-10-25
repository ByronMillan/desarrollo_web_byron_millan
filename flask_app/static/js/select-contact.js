let contadorContactos = 1;  
const maxContactos = 5;  

function displayID(selectElement) {
  const container = selectElement.closest(".contacto-input");
  const idLabel = container.querySelector(".id-label");
  const idInput = container.querySelector("input");
  const contactButton = document.getElementById("agregar-contacto")
  
  if (selectElement.value !== "") {
      idLabel.style.display = "block";
      idInput.style.display = "block";
      if (contadorContactos < maxContactos)
        contactButton.style.display = "block";
  } else {
      idLabel.style.display = "none";
      idInput.style.display = "none";
  }
};

function addContact() {
    if (contadorContactos >= maxContactos) return;

    contadorContactos++;
    const container = document.getElementById("contactos-container");

    const nuevoContacto = document.createElement("div");
    nuevoContacto.classList.add("contacto-input");
    nuevoContacto.innerHTML = `
      <label for="select-contact-${contadorContactos}">Contactar por</label>
      <select id="select-contact-${contadorContactos}" name="select-contact-${contadorContactos}" class="select-contact">
        <option value="">-- Seleccionar --</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="telegram">Telegram</option>
        <option value="x">X</option>
        <option value="instagram">Instagram</option>
        <option value="tiktok">TikTok</option>
        <option value="otra">Otra</option>
      </select><br>
      <label for="id-url-${contadorContactos}" class="id-label" style="display: none;">ID o URL</label>
      <input id="id-url-${contadorContactos}" name="id-url-${contadorContactos}" type="text" minlength="4" maxlength="50" style="display: none;">
    `;

    container.insertBefore(nuevoContacto, document.getElementById('agregar-contacto'));

    nuevoContacto.querySelector(".select-contact").addEventListener("change", function(e) {
      displayID(e.target);
    });

    if (contadorContactos >= maxContactos) {
      document.getElementById("agregar-contacto").style.display = "none";
    }
};

document.querySelector(".select-contact").addEventListener("change", function(e) {
  displayID(e.target);
});  
document.getElementById("agregar-contacto").addEventListener("click", addContact);
