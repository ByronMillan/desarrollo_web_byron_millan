function setDate() {
    const fechaInput = document.getElementById("fecha");

    const now = new Date();
    now.setHours(now.getHours() + 3);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const minDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    fechaInput.value = minDate;
    fechaInput.min = minDate;
};

window.addEventListener("DOMContentLoaded", setDate);
