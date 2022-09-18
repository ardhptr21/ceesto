import pytesseract
import re
import cv2 as cv
import numpy as np


def split_text(item):
    return re.sub("([\s\S])*:", "", item).strip()


def extraction():
    scan_img = cv.imread("scan.jpg")

    if scan_img is None:
        print("Image not found")
        exit()

    extraction = pytesseract.image_to_string(
        scan_img, lang="ind", config="--psm 6 --oem 3"
    )

    if "SMK NEGERI 7 SEMARANG" not in extraction:
        print("ID Card not recognized")
        return False

    data = {"nama": "", "nis": "", "kelas": ""}

    for item in extraction.split("\n"):
        if "Nama" in item:
            data["nama"] = split_text(item)
        if "NIS" in item:
            data["nis"] = split_text(item).split("/")[0]
        if "Jurusan" in item:
            data["kelas"] = split_text(item)

    return data
