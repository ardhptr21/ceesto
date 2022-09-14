from .connect import db
from cuid import cuid
from datetime import datetime


def insert_user(nama, kelas, nis):
    cursor = db.cursor()
    sql = "INSERT INTO siswa (id, nama, kelas, nis, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s, %s)"
    now = datetime.today()
    cursor.execute(sql, (cuid(), nama, kelas, nis, now, now))
    db.commit()

    return cursor.rowcount
