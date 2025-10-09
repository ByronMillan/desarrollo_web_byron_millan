import pymysql
import pymysql.cursors
import json
from datetime import datetime

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

def null_if_empty(value):
    return value if value and value.strip() != "" else None

# -- conn ---

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

# -- querys --

def get_photo_by_notice_id(aviso_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_photos_by_notice_id"], (aviso_id,))
	foto = cursor.fetchone()
	return foto

def get_commune_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_commune_by_id"], (id,))
	comuna = cursor.fetchone()
	return comuna

def get_commune_by_name(name):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_commune_by_name"], (name,))
	comuna = cursor.fetchone()
	return comuna

def get_notices(page_size, offset):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_notices"], (page_size, offset))
	avisos = cursor.fetchall()
	cursor.close()
	conn.close()
	return avisos

def add_notice(form):
	# Obtener campos
	fecha_ingreso = datetime.now().replace(second=0, microsecond=0)
	comuna_id = form.get("select-commune")
	sector = null_if_empty(form.get("sector"))
	nombre = form.get("nombre")
	email = form.get("email")
	celular = null_if_empty(form.get("numero"))
	tipo = form.get("tipo")
	cantidad = form.get("cantidad")
	edad = form.get("edad")
	unidad_medida = form.get("unidad-edad")
	fecha_entrega_str = form.get("fecha")
	fecha_entrega = datetime.strptime(fecha_entrega_str, "%Y-%m-%dT%H:%M")
	descripcion = null_if_empty(form.get("descripcion"))
	# Añadir a la tabla
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_notice"], (fecha_ingreso, comuna_id, sector, nombre, email, celular, tipo, cantidad, 
											  edad, unidad_medida, fecha_entrega, descripcion))
	aviso_id = cursor.lastrowid
	conn.commit()
	cursor.close()
	conn.close()
	return aviso_id

def add_contact(aviso_id, tipo, valor):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_contact"], (tipo, valor, aviso_id))
	conn.commit()
	cursor.close()
	conn.close()

def add_photo(aviso_id, img_filename):
	path_img = f"uploads/{img_filename}"
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_photo"], (path_img, img_filename, aviso_id))
	conn.commit()
	cursor.close()
	conn.close()

def count_notices():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["count_notices"])
	result = cursor.fetchone()
	cursor.close()
	conn.close()
	return result[0] if result else 0

def get_number_of_photos(aviso_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["count_photos"], (aviso_id,))
	result = cursor.fetchone()
	cursor.close()
	conn.close()
	return result[0] if result else 0

def get_notice_by_id(aviso_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_notice_by_id"], (aviso_id,))
	aviso = cursor.fetchone()
	cursor.close()
	conn.close()
	return aviso

def get_region_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_region_by_id"], (id,))
	region = cursor.fetchone()
	cursor.close()
	conn.close()
	return region

def get_all_contacts(aviso_id):
	conn = get_conn()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute(QUERY_DICT["get_all_contacts"], (aviso_id,))
	contacts = cursor.fetchall()
	cursor.close()
	conn.close()
	return contacts

def get_all_photos(aviso_id):
	conn = get_conn()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute(QUERY_DICT["get_photos_by_notice_id"], (aviso_id,))
	fotos = cursor.fetchall()
	cursor.close()
	conn.close()
	return fotos