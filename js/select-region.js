const poblarRegiones = () => {
    let regionSelect = document.getElementById("select-region");
    for (const region of region_comuna.regiones) {
        let option = document.createElement("option");
        option.value = region.numero;
        option.text = region.nombre;
        regionSelect.appendChild(option);
    }
};

const updateComunas = () => {
    let regionSelect = document.getElementById("select-region");
    let comunaSelect = document.getElementById("select-commune");
    let selectedRegion = regionSelect.value;

    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    let regionSeleccionada = region_comuna.regiones.find(r => r.numero == selectedRegion);
   
    if (regionSeleccionada) {
        regionSeleccionada.comunas.forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna.id;
            option.text = comuna.nombre;
            comunaSelect.appendChild(option);
        })
    }
};

document.getElementById("select-region").addEventListener("change", updateComunas);

window.onload = () => {
    poblarRegiones();
};