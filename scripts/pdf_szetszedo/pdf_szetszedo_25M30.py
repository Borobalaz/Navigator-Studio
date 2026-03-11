from PyPDF2 import PdfReader
from PyPDF2 import PdfWriter
import os

from runtime_status import RuntimeStatus, ExitCategory

name_line = 9
company_line = 5
name_starting_pos = 3
company_staring_pos = 1


#----------------------------- MAIN -----------------------------#
if __name__ == "__main__":

  status = RuntimeStatus()

  source_dir = "./in/25M30/"
  output_dir = "./out/25M30/"

  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  if not os.path.exists(source_dir):
    status.set_exit(
      ExitCategory.VALIDATION_ERROR,
      "Bemeneti mappa nem található."
    )
    status.finish()

  source = os.listdir(source_dir)

  if len(source) != 1:
    status.set_exit(
      ExitCategory.VALIDATION_ERROR,
      "A bemeneti mappában pontosan egy fájlnak kell lennie."
    )
    status.finish()

  file_path = os.path.join(source_dir, source[0])

  try:
    reader = PdfReader(file_path)
  except Exception:
    status.set_exit(
      ExitCategory.VALIDATION_ERROR,
      "A bemeneti fájl nem olvasható PDF."
    )
    status.finish()

  total_chunks = max(1, len(reader.pages) // 3)
  processed = 0

  i = 0
  while i < len(reader.pages):

    page = reader.pages[i]

    text_body = page.extract_text()
    lines = text_body.split("\n")

    name_line_text = lines[name_line]
    company_line_text = lines[company_line]

    title = lines[1].split(" ")
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

    writer = PdfWriter()
    writer.add_page(reader.pages[i])
    writer.add_page(reader.pages[i+1])
    writer.add_page(reader.pages[i+2])

    output_path = os.path.join(output_dir, nameString + ".pdf")

    with open(output_path, "wb") as f:
      writer.write(f)

    i += 3
    processed += 1

    percent = int((processed / total_chunks) * 100)
    status.set_progress(percent)

  status.set_progress(100)
  status.set_exit(
    ExitCategory.SUCCESS,
    "PDF feldolgozás sikeresen befejezve."
  )
  status.finish()