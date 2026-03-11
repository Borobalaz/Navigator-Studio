import fitz  # PyMuPDF
import os
import sys
from runtime_status import RuntimeStatus, ExitCategory


INPUT_FOLDER = "./input/"


def process_pdf(pdf_path, image_path, status):
  try:
    if not os.path.exists(pdf_path):
      raise FileNotFoundError(f"PDF not found: {pdf_path}")

    if not os.path.exists(image_path):
      raise FileNotFoundError(f"Image not found: {image_path}")

    doc = fitz.open(pdf_path)
    total_pages = len(doc)

    for page_number, page in enumerate(doc, start=1):
      text_instances = page.search_for("aláírás")

      if text_instances:
        # Only first occurrence per page
        inst = text_instances[0]
        x0, y0, x1, y1 = inst

        image_width = 120
        image_height = 50
        margin = 10

        center_x = (x0 + x1) / 2
        image_rect = fitz.Rect(
          center_x - image_width / 2,
          y0 - image_height - margin,
          center_x + image_width / 2,
          y0 - margin
        )

        # Prevent image from going above page
        if image_rect.y0 < 0:
          shift = -image_rect.y0
          image_rect.y0 += shift
          image_rect.y1 += shift

        page.insert_image(image_rect, filename=image_path)

      # Update progress per page
      percent = int((page_number / total_pages) * 100)
      status.set_progress(percent)
      
    if(not os.path.exists("./output/")):
      os.makedirs("./output/")

    output_path = os.path.join(
      "./output/",
      "signed_" + os.path.basename(pdf_path)
    )
    doc.save(output_path)
    doc.close()

    return output_path

  except Exception as e:
    raise RuntimeError(f"Failed to process {pdf_path}: {str(e)}")


def main():
  status = RuntimeStatus()

  if len(sys.argv) < 2:
    status.set_exit(ExitCategory.VALIDATION_ERROR, "Usage: python automatikus_alairas_batch.py <signature_image.png>")
    status.finish()

  image_path = sys.argv[1]

  try:
    pdf_files = [f for f in os.listdir(INPUT_FOLDER) if f.lower().endswith(".pdf")]
    if not pdf_files:
      status.set_exit(ExitCategory.VALIDATION_ERROR, f"No PDFs found in {INPUT_FOLDER}")
      status.finish()

    total_files = len(pdf_files)
    for idx, pdf_file in enumerate(pdf_files, start=1):
      pdf_path = os.path.join(INPUT_FOLDER, pdf_file)
      output_path = process_pdf(pdf_path, image_path, status)
      # Optional: progress per file (scaled to 0–100)
      file_percent = int((idx / total_files) * 100)
      status.set_progress(file_percent)

    status.set_exit(ExitCategory.SUCCESS, f"Processed {total_files} PDF(s).")

  except Exception as e:
    status.set_exit(ExitCategory.SYSTEM_ERROR, str(e))

  finally:
    status.finish()


if __name__ == "__main__":
  main()