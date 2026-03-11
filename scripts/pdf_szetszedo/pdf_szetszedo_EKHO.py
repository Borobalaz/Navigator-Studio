from PyPDF2 import PdfReader
from PyPDF2 import PdfWriter
import os

name_line = 11
company_line = 5
name_starting_pos = 2
company_staring_pos = 1
#----------------------------- MAIN -----------------------------#
if __name__ == "__main__":

    try:
        source = os.listdir("./in/EKHO/")
    except Exception:
        print("------------ HELYTELEN BEMENET ------------")
        print("Bemeneti mappa nem található.")
    
    # Process each file in the source directory
    for j in range(len(source)):

        reader = None
        try: 
            reader = PdfReader("./in/EKHO/" + source[j])
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
            
            # find name
            name = name_line_text.split(" ")
            name = list(filter(lambda x: len(x) != 0, name))
            name = name[name_starting_pos:]
            nameString = " ".join(name)
    
            # find company
            company = company_line_text.split(" ")
            company = list(filter(lambda x: len(x) != 0, company))
            company = company[company_staring_pos:]
            companyString = " ".join(company)

            nameString = companyString[:8] + " - " + nameString

            print(nameString)

            writer = PdfWriter(name)
            writer.add_page(reader.pages[i])
            try:
                writer.write("./out/EKHO/" + nameString + ".pdf")
            except Exception as e:
                print(e)
            
            i += 1
            
