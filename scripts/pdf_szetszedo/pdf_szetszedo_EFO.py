from PyPDF2 import PdfReader
from PyPDF2 import PdfWriter
import os

name_line = 8
company_line = 4
name_starting_pos = 3
company_staring_pos = 2
#----------------------------- MAIN -----------------------------#
if __name__ == "__main__":

    try:
        source = os.listdir("./in/EFO/")
    except Exception:
        print("------------ HELYTELEN BEMENET ------------")
        print("Bemeneti mappa nem található.")

    pdfDict = {} # name : page[]

    # Process each file in the source directory
    for j in range(len(source)):

        reader = None
        try: 
            reader = PdfReader("./in/EFO/" + source[j])
        except Exception: 
            print("------------ HELYTELEN BEMENET ------------")
            print("Bemeneti mappa nem található vagy nem PDF-et tartalmaz.")

        i = 0
        while i < len(reader.pages):
            page = reader.pages[i]

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

            if nameString in pdfDict:
                pdfDict[nameString].append(page)  
            else:
                pdfDict.update({nameString: [page]})            
            i += 1

    for name in pdfDict:
        writer = PdfWriter(name)
        for page in pdfDict[name]:
            writer.add_page(page)
        try:
            writer.write("./out/EFO/" + name + ".pdf")
        except Exception as e:
            print(e)

