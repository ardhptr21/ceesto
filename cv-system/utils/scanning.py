import os


def scan():
    os.system(
        "wia-cmd-scanner /w 80 /h 50 /dpi 300 /color GRAY /format JPG /output .\scan.jpg"
    )
