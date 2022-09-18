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
        blur = cv.GaussianBlur(gray, (5, 5), 0)
        thresh = cv.threshold(blur, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)[1]
        kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
        opening = cv.morphologyEx(thresh, cv.MORPH_OPEN, kernel, iterations=1)

        cv.imshow("capture", opening)

        key = cv.waitKey(1)
        if key == ord("q") or key == 27:
            break
        elif key == ord("s"):
            cv.imwrite("scan.jpg", opening)
            sleep(0.5)
            break

    cap.release()
    cv.destroyAllWindows()
