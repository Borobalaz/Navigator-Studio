from PyPDF2 import PdfReader
from PyPDF2 import PdfWriter
import os

name_line = 9
company_line = 5
name_starting_pos = 3
company_staring_pos = 1

#----------------------------- MAIN -----------------------------#
if __name__ == "__main__":

    source = os.listdir("./in/")
    if(len(source) != 1):
        print("------------ HELYTELEN BEMENET ------------")
        print("A bemeneti mappában pontosan egy filenak kell lennie.")

    # Process each file in the source directory
    for i in range(len(source)):
        reader = None
        try: 
            reader = PdfReader("./in/24M30/" + source[i])
        except Exception: 
            print("------------ HELYTELEN BEMENET ------------")
            print("Bemeneti mappa nem található vagy nem PDF-et tartalmaz.")

        i = 0
        while i < len(reader.pages):
            page = reader.pages[i]

            parts = []
            text_body = page.extract_text()
            name_line_text = text_body.split("\n")[name_line]
            company_line_text = text_body.split("\n")[company_line]

            title = text_body.split("\n")[1]
            title = title.split(" ")
            title = list(filter(lambda x: len(x) != 0, title))


            # find name
            name = name_line_text.split(" ")
            name = list(filter(lambda x: len(x) != 0, name))
            name = name[name_starting_pos:]
            nameString = " ".join(name)
            nameString += " " + title[0]

            # find company
            company = company_line_text.split(" ")
            company = list(filter(lambda x: len(x) != 0, company))
            company = company[company_staring_pos:]
            companyString = " ".join(company)

            nameString = companyString[:8] + " - " + nameString

            writer = PdfWriter(name)
            writer.add_page(reader.pages[i])
            writer.add_page(reader.pages[i+1])
            try:
                writer.write("./out/24M30/" + nameString + ".pdf")
            except Exception as e:
                print(e)
            i += 2
            
    input("ENTER TO EXIT")