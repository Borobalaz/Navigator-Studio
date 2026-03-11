import pandas as pd
import os
import sys

from runtime_status import RuntimeStatus, ExitCategory


def read_csv_safely(file_path):
  for encoding in ["utf-8", "latin-1", "cp1250"]:
    try:
      return pd.read_csv(
        file_path,
        sep=None,
        engine="python",
        encoding=encoding
      )
    except Exception:
      continue
  raise ValueError(f"Could not read file: {file_path}")


def main(output_excel, status):

  csv_folder = "./csvs"

  if not os.path.exists(csv_folder):
    status.set_exit(
      ExitCategory.VALIDATION_ERROR,
      "CSV mappa nem található."
    )
    status.finish()

  csv_files = [f for f in os.listdir(csv_folder) if f.endswith(".csv")]

  if not csv_files:
    status.set_exit(
      ExitCategory.VALIDATION_ERROR,
      "Üres a CSV mappa."
    )
    status.finish()

  dataframes = []

  total = len(csv_files)
  processed = 0

  # Read all CSVs
  for filename in csv_files:

    file_path = os.path.join(csv_folder, filename)
    df = read_csv_safely(file_path)

    file_name_without_ext = os.path.splitext(filename)[0]
    df.insert(0, "Cégnév", file_name_without_ext)

    dataframes.append(df)

    processed += 1
    percent = int((processed / total) * 80)
    status.set_progress(percent)

  # Combine all CSVs with unified columns
  combined_df = pd.concat(dataframes, ignore_index=True, sort=False)

  # Replace missing values with 0
  combined_df = combined_df.fillna(0)

  status.set_progress(90)

  # Save as Excel
  with pd.ExcelWriter(output_excel, engine="openpyxl") as writer:
    combined_df.to_excel(writer, sheet_name="Combined", index=False)

  status.set_progress(100)

  status.set_exit(
    ExitCategory.SUCCESS,
    f"Excel mentve: '{output_excel}'."
  )
  
  status.finish()


if __name__ == "__main__":

  status = RuntimeStatus()

  if len(sys.argv) < 2:
    output_excel = "combined.xlsx"
  else:
    output_excel = sys.argv[1]

  main(output_excel, status)