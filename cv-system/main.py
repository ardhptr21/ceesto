import os
from utils.capture import capture
from utils.extraction import extraction
from utils.scanning import scan
from db import query
import winsound

if __name__ == "__main__":
    if os.path.exists("./scan.jpg"):
        os.remove("./scan.jpg")

    isSaved: bool = False
    media = input("Pilih media yang akan digunakan (1. Kamera, 2. Scanner): ")

    if media == "1":
        capture()
    elif media == "2":
        scan()
    else:
        print("Media tidak tersedia")
        exit()

    data: bool | dict = extraction()

    if type(data) == dict:
        isAllNotEmpty = all([bool(data[k]) for k in data.keys()])
        if isAllNotEmpty:
            isSaved = True
    print(data)
    if isSaved:
        query.insert_user(**data)
        print("Berhasil memasukkan data")
        winsound.PlaySound("./audio/success.wav", winsound.SND_FILENAME)
    else:
        winsound.PlaySound("./audio/failed.wav", winsound.SND_FILENAME)
        print("Gagal memasukkan data")
