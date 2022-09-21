import cv2 as cv
from time import sleep


def capture(val=0):
    cap = cv.VideoCapture(val)
    if not cap.isOpened():
        print("Cannot open camera")
        exit()

    while 1:
        ret, frame = cap.read()

        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        # thresh = cv.threshold(gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)[1]
        # kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
        # opening = cv.morphologyEx(thresh, cv.MORPH_OPEN, kernel, iterations=1)

        cv.imshow("capture", gray)

        key = cv.waitKey(1)
        if key == ord("q") or key == 27:
            return "break"
        elif key == ord("s"):
            noiseless = cv.fastNlMeansDenoising(gray, None, 20, 7, 21)
            cv.imwrite("scan.jpg", noiseless)
            sleep(0.5)
            return "break"

    cap.release()
    cv.destroyAllWindows()
