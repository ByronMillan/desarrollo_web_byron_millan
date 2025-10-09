import re
import filetype
from datetime import datetime, timedelta

def get_contactos(form):
    contactos = []
    for i in range(1, 6):
        tipo = form.get(f"select-contact-{i}")
        valor = form.get(f"id-url-{i}")
        if tipo and valor and valor.strip():
            contactos.append({
                "tipo": tipo.strip(),
                "valor": valor.strip()
            })
    return contactos


def validate_img(img):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    # check if a file was submitted
    if img is None:
        return False

    # check if the browser submitted an empty file
    if img.filename == "":
        return False
    
    # check file extension
    ftype_guess = filetype.guess(img)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True


def validate_images(files):
    valid_images = []
    if files:
        for f in files:
            if validate_img(f):
                valid_images.append(f)
    return valid_images


def validate_form(form, files=None):
    errores = []

    if not form.get("select-region"):
        errores.append("Región")
    if not form.get("select-commune"):
        errores.append("Comuna")
    
    sector = form.get("sector", "").strip()
    if sector and len(sector) > 100:
        errores.append("Sector")

    nombre = form.get("nombre", "").strip()
    if not (3 <= len(nombre) <= 200):
        errores.append("Nombre")

    email = form.get("email", "").strip()
    if not re.match(r"^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$", email) or len(email) > 100:
        errores.append("Email")

    numero = form.get("numero", "").strip()
    if numero:
        if not re.match(r"^\+\d{3}\.\d{8}$", numero) or len(numero) < 13:
            errores.append("Número de celular")
    
    if not form.get("tipo"):
        errores.append("Tipo")

    try:
        cantidad = int(form.get("cantidad"), 0)
        if cantidad < 1:
            errores.append("Cantidad")
    except ValueError:
        errores.append("Cantidad")

    try:
        edad = int(form.get("edad"), 0)
        if edad < 1:
            errores.append("Edad")
    except ValueError:
        errores.append("Edad")

    if not form.get("unidad-edad"):
        errores.append("Unidad de medida de edad")

    fecha = form.get("fecha", "")
    if not fecha:
        errores.append("Fecha de entrega")
    else:
        try:
            fecha_input = datetime.strptime(fecha, "%Y-%m-%dT%H:%M")
            min_fecha = datetime.now() + timedelta(hours=3)
            if fecha_input < min_fecha:
                errores.append("Fecha de entrega")
        except ValueError:
            errores.append("Formato de fecha inválido")

    descripcion = form.get("descripcion", "").strip()
    if len(descripcion) > 500:
        errores.append("Descripción (máx. 500 caracteres)")

    valid_images = validate_images(files)
    if len(valid_images) < 1 or len(valid_images) > 5:
        errores.append("Fotos (entre 1 y 5 imágenes válidas)")
    
    contactos = get_contactos(form)
    for contacto in contactos:
        valor = contacto["valor"]
        if len(valor) < 4 or len(valor) > 50:
            errores.append("ID/URL de contacto inválido")

    return errores, valid_images
    