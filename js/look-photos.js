function verFoto(imgElement) {
  const modal = document.getElementById("modalFoto");
  const fotoGrande = document.getElementById("fotoGrande");
  fotoGrande.src = imgElement.src;
  modal.style.display = "flex";
};

function cerrarModal() {
  const modal = document.getElementById("modalFoto");
  modal.style.display = "none";
};