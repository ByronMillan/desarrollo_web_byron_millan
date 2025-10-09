from flask import Flask, request, render_template, redirect, url_for, flash
from utils.validations import validate_form, get_contactos
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import math

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)


app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Index Routes ---
@app.route("/", methods=["GET"])
def portada():
    # obtener últimos cinco avisos
    data = []
    for aviso in db.get_notices(page_size=5, offset=0):
        aviso_id, fecha, comuna_id, sector, _, _, _, tipo, cantidad, edad, unidad_medida, _, _ = aviso
        _, ruta_foto1, _, _ = db.get_photo_by_notice_id(aviso_id)
        _, comuna, _ = db.get_commune_by_id(comuna_id)
        
        data.append({
            "fecha": fecha,
            "comuna": comuna,
            "sector": sector,
            "cantidad": cantidad,
            "tipo": tipo,
            "edad": edad,
            "unidad_medida": unidad_medida, 
            "foto1": url_for('static', filename=ruta_foto1)
        })
    return render_template("index/listado-portada.html", data=data)

# --- Agregar Routes ---
@app.route("/agregar", methods=["GET", "POST"])
def agregar():
    if request.method == "POST":
        form = request.form
        files = request.files.getlist("fotos")

        errores, valid_images = validate_form(form, files)
        if errores:
            flash(f"Errores de validación: {', '.join(errores)}")
            return render_template('agregar/agregar.html', form=form)
        
        aviso_id = db.add_notice(form)

        contactos = get_contactos(form)
        for c in contactos:
            db.add_contact(aviso_id, c["tipo"], c["valor"])

        for img in valid_images:
            _filename = hashlib.sha256(
                secure_filename(img.filename)
                .encode("utf-8")
                ).hexdigest()
            _extension = filetype.guess(img).extension
            img_filename = f"{_filename}.{_extension}"
            img.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
            db.add_photo(aviso_id, img_filename)

        flash("Hemos recibido la información de adopción, muchas gracias y suerte!")
        return redirect(url_for("portada"))
    

    elif request.method == "GET":
        return render_template("agregar/agregar.html")

# --- Listado Routes ---
@app.route("/listado", methods=["GET"])
def listado():
    # obtener número de página desde la query string
    page = request.args.get("page", default=1, type=int)
    page_size = 5
    offset = (page - 1) * page_size

    # obtener los avisos correspondientes
    notices = db.get_notices(page_size=page_size, offset=offset)
    total_notices = db.count_notices()
    total_pages = math.ceil(total_notices / page_size)
    # obtener todos los avisos de la tabla
    data = []
    for aviso in notices:
        aviso_id, fecha_ingreso, comuna_id, sector, nombre, _, _, tipo, cantidad, edad, unidad_medida, fecha_entrega, _ = aviso
        numero_fotos = db.get_number_of_photos(aviso_id)
        _, comuna, _ = db.get_commune_by_id(comuna_id)
        
        data.append({
            "id": aviso_id,
            "fecha_publicacion": fecha_ingreso,
            "fecha_entrega": fecha_entrega,
            "comuna": comuna,
            "sector": sector,
            "cantidad": cantidad,
            "tipo": tipo,
            "edad": edad,
            "unidad_medida": unidad_medida,
            "nombre": nombre,
            "numero_fotos": numero_fotos 
        })

    return render_template("listado/listado.html", data=data, page=page, total_pages=total_pages)

# --- Informacion Routes ---
@app.route("/info-aviso/<int:aviso_id>", methods=["GET"])
def info_aviso(aviso_id):
    notice = db.get_notice_by_id(aviso_id)
    if not notice:
        flash("El aviso solicitado no existe.", "error")
        return redirect(url_for("portada"))
    
    _, _, comuna_id, sector, nombre, email, celular, tipo, cantidad, edad, unidad_medida, fecha_entrega, descripcion = notice
    _, comuna, region_id = db.get_commune_by_id(comuna_id)
    _, region = db.get_region_by_id(region_id)

    aviso = {
        "id": aviso_id,
        "region": region,
        "comuna": comuna,
        "sector": sector if sector not in (None, "NULL", "") else None,
        "nombre": nombre,
        "email": email,
        "celular": celular if celular not in (None, "NULL", "") else None,
        "tipo": tipo,
        "cantidad": cantidad,
        "edad": edad,
        "unidad_medida": unidad_medida,
        "fecha_entrega": fecha_entrega,
        "descripcion": descripcion if descripcion not in (None, "NULL", "") else None      
    }

    contactos = db.get_all_contacts(aviso_id)
    fotos = db.get_all_photos(aviso_id)

    return render_template("info/informacion.html", aviso=aviso, contactos=contactos, fotos=fotos)

# --- Estadisticas Routes ---
@app.route("/estadisticas", methods=["GET"])
def estadisticas():
    return render_template("estadisticas/estadisticas.html")