import os


def scan():
    # check if scan.jpg is exists
    if os.path.exists("./scan.jpg"):
        os.remove("./scan.jpg")
    os.system(
        "wia-cmd-scanner /w 80 /h 50 /dpi 300 /color GRAY /format JPG /output .\scan.jpg"
    )
