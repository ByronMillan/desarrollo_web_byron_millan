const validateSelect = (select) => {  
    if (!select) return false;
    return true;
};

const validateSector = (sector) => {
    if (!sector) return true;
    let lengthValid = sector.length <= 100;

    return lengthValid;
};

const validateName = (name) => {
    if (!name) return false;
    let lengthValid =  name.trim().length >= 3 && name.trim().length <= 200;

    return lengthValid;
};

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.trim().length <= 100;

    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);

    return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return true;

    let lengthValid = phoneNumber.trim().length >= 13;

    let re = /^\+\d{3}\.\d{8}$/;
    let formatValid = re.test(phoneNumber);

    return lengthValid && formatValid;
};

const validateType = (type) => {
    if (!type) return false;
    return true;
};

const validateQuantity = (quantity) => {
    if (!quantity) return false;

    const num = Number(quantity);

    if (Number.isInteger(num) && num >= 1) {
      return true;
    }

    return false;
};

const validateAge = (age) => {
    if (!age) return false;

    const num = Number(age);

    if (Number.isInteger(num) && num >=1) {
      return true;
    }

    return false;
};

const validateUnit = (unit) => {
    if (!unit) return false;
    return true;
};

const validateDate = (date) => {
    if (!date) return false;

    const now = new Date();
    now.setHours(now.getHours() + 3);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    
    const minDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    if (date < minDate) return false;
    return true;
};

const validatePhotos = (photos) => {
  let validCount = 0;

  for (const input of photos) {
    if (input.files.length > 0) {
      for (const file of input.files) {
        if (!file.type.startsWith("image/")) {
          return false;
        }
      }
      validCount++;
    }
  }

  return validCount >= 1 && validCount <= 5;
};


const validateForm = () => {
  let myForm = document.forms["myForm"];
  let region = myForm["select-region"].value;
  let comuna = myForm["select-commune"].value;
  let sector = myForm["sector"].value;
  let name = myForm["nombre"].value;
  let email = myForm["email"].value;
  let phoneNumber = myForm["numero"].value;
  let type = myForm["tipo"].value;
  let quantity = myForm["cantidad"].value;
  let age = myForm["edad"].value;
  let unit = myForm["unidad-edad"].value;
  let date = myForm["fecha"].value;
  let photos = document.getElementById("photo-container").querySelectorAll("input[type='file']");


  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  if (!validateSelect(region)) {
    setInvalidInput("Región");
  }
  if (!validateSelect(comuna)) {
    setInvalidInput("Comuna");
  }
  if (!validateSector(sector)) {
    setInvalidInput("Sector");
  }
  if (!validateName(name)) {
    setInvalidInput("Nombre");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    setInvalidInput("Número de celular");
  }
  if (!validateType(type)) {
    setInvalidInput("Tipo");
  }
  if (!validateQuantity(quantity)) {
    setInvalidInput("Cantidad");
  }
  if (!validateAge(age)) {
    setInvalidInput("Edad");
  }
  if (!validateUnit(unit)) {
    setInvalidInput("Unidad de medidad de edad");
  }
  if (!validateDate(date)) {
    setInvalidInput("Fecha disponible para entrega");
  }
  if (!validatePhotos(photos)) {
    setInvalidInput("Fotos");
  }

  const contactBlocks = document.querySelectorAll(".contacto-input");
  contactBlocks.forEach(block => {
    const select = block.querySelector(".select-contact");
    const input = block.querySelector("input");

    if (select && select.value !== "") {
      if (!input.value || input.value.trim().length < 4 || input.value.trim().length > 50) {
        setInvalidInput(`ID/URL de contacto`);
      }
    } 
  });


  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
   
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";

    // aplicar estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";

    validationBox.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    myForm.style.display = "none";

    validationMessageElem.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";

    // aplicar estilos de éxito
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    let submitButton = document.createElement("button");
    submitButton.innerText = "Sí, estoy seguro";
    submitButton.style.marginLeft = "80px";
    submitButton.addEventListener("click", () => {
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";

      submitButton.style.display = "none";
      backButton.style.display = "none";
      let homeButton = document.createElement("button");
      homeButton.innerText = "Volver a la portada";
      homeButton.style.marginLeft = "200px";
      homeButton.addEventListener("click", () => {
        window.location.href = "../html/index.html";
      });

      validationListElem.appendChild(homeButton);
    });

    let backButton = document.createElement("button");
    backButton.innerText = "No, no estoy seguro, quiero volver al formulario";
    backButton.style.marginLeft = "15px";
    backButton.addEventListener("click", () => {
      myForm.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);

    validationBox.hidden = false;
  }
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);