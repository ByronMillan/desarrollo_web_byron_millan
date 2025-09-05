const MAX_FOTOS = 5;
const photoContainer = document.getElementById("photo-container");
const addPhotoBtn = document.getElementById("agregar-foto");

addPhotoBtn.addEventListener("click", () => {
  const totalInputs = photoContainer.querySelectorAll("input[type='file']").length;

  if (totalInputs < MAX_FOTOS) {
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.name = "fotos";
    newInput.accept = "image/*";
    photoContainer.appendChild(newInput);
  }

  if (totalInputs + 1 >= MAX_FOTOS) {
    addPhotoBtn.style.display = "none";
  }
});