from PyPDF2 import PdfReader
from PyPDF2 import PdfWriter
import os

def visitor_body(text, cm, tm, fontDict, fontSize):
    y = tm[5]
    x = tm[4]
    if(x > 0 and x < 37):
        parts.append(text)

name_line = 9
name_starting_pos = 3

#----------------------------- MAIN -----------------------------#
if __name__ == "__main__":

    source = os.listdir("./in/BER/")
    if(len(source) != 1):
        print("------------ HELYTELEN BEMENET ------------")
        print("A bemeneti mappában pontosan egy filenak kell lennie.")

    reader = None
    try: 
        reader = PdfReader("./in/BER/" + source[0])
    except Exception: 
        print("------------ HELYTELEN BEMENET ------------")
        print("Bemeneti mappa nem található vagy nem PDF-et tartalmaz.")

    names = []
    pages = []
    for page in reader.pages:
        pages.append(page)
        text_body = page.extract_text()
        if not text_body:
            names.append("UNKNOWN")
            continue

        # Find line containing "SZÜL"
        szul_line = None
        for line in text_body.split("\n"):
            if "SZÜL" in line:
                szul_line = line
                break

        if szul_line:
            # Name is everything before "SZÜL"
            nameString = szul_line.split("SZÜL")[0].strip()
        else:
            nameString = "UNKNOWN"

        names.append(nameString)

    for i in range(len(reader.pages)):
        writer = PdfWriter(names[i])
        writer.add_page(pages[i])
        try: 
            writer.write("./out/BER/" + names[i] + ".pdf")
        except Exception as e:
            print(e)

    print("Sikeres feldolgozás!")
            
